import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";
import Product from "@/models/Product";

function generateOrderNumber() {
  return `ORD-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;
}

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();
    const {
      items,
      customer,
      shippingAddress,
      paymentMethod = "Cash on Delivery",
      deliveryCharges = 0,
      note = "",
    } = body ?? {};

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { success: false, message: "Order items are required." },
        { status: 400 }
      );
    }

    const productIds = items.map((item: { productId?: string; _id?: string }) => item.productId || item._id).filter(Boolean);

    if (productIds.length === 0) {
      return NextResponse.json(
        { success: false, message: "Valid product ids are required." },
        { status: 400 }
      );
    }

    const dbProducts = await Product.find({
      _id: { $in: productIds },
    });

    const normalizedItems = items.map((item: any) => {
      const product = dbProducts.find(
        (dbProduct) => String(dbProduct._id) === String(item.productId || item._id)
      );

      if (!product) {
        throw new Error("One or more products were not found.");
      }

      const quantity = Number(item.quantity ?? 1);
      const price = Number(product.discountedPrice ?? product.price ?? item.price ?? 0);

      return {
        productId: product._id,
        name: product.name,
        category: product.category,
        image: product.images?.[0] ?? "",
        price,
        quantity,
        lineTotal: price * quantity,
      };
    });

    if (!customer?.firstName || !customer?.lastName) {
      return NextResponse.json(
        { success: false, message: "Customer name is required." },
        { status: 400 }
      );
    }

    if (!shippingAddress?.address || !shippingAddress?.city || !shippingAddress?.country) {
      return NextResponse.json(
        { success: false, message: "Shipping address is required." },
        { status: 400 }
      );
    }

    const subtotal = normalizedItems.reduce(
      (sum, item) => sum + item.lineTotal,
      0
    );
    const total = subtotal + Number(deliveryCharges || 0);
    const orderNumber = generateOrderNumber();

    const order = await Order.create({
      orderNumber,
      customer: {
        firstName: customer.firstName,
        lastName: customer.lastName,
        email: customer.email || "",
        phone: customer.phone || "",
      },
      shippingAddress: {
        country: shippingAddress.country,
        address: shippingAddress.address,
        apartmentNo: shippingAddress.apartmentNo || "",
        city: shippingAddress.city,
        area: shippingAddress.area || "",
        postalCode: shippingAddress.postalCode || "",
      },
      paymentMethod,
      items: normalizedItems,
      subtotal,
      deliveryCharges: Number(deliveryCharges || 0),
        total,
      note,
    });

    const orderData = order.toObject();

    return NextResponse.json(
      {
        success: true,
        message: "Order created successfully.",
        orderNumber: order.orderNumber,
        price: order.total,
        order: {
          id: String(order._id),
          ...orderData,
          status: orderData.status ?? "Pending",
          createdAt: orderData.createdAt?.toISOString?.() ?? orderData.createdAt,
          updatedAt: orderData.updatedAt?.toISOString?.() ?? orderData.updatedAt,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create Order Error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "Something went wrong.",
      },
      { status: 500 }
    );
  }
}
