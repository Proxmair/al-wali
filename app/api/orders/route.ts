import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";
import Product from "@/models/Product";
import Deal from "@/models/Deal";

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
        {
          success: false,
          message: "Order items are required.",
        },
        {
          status: 400,
        }
      );
    }

    const productIds = items
      .filter((item: any) => item.itemType !== "Deal")
      .map((item: any) => item.productId || item._id)
      .filter(Boolean);

    const dealIds = items
      .filter((item: any) => item.itemType === "Deal")
      .map((item: any) => item.dealId)
      .filter(Boolean);

    if (productIds.length === 0 && dealIds.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Valid product or deal ids are required.",
        },
        {
          status: 400,
        }
      );
    }

    const dbProducts = await Product.find({
      _id: {
        $in: productIds,
      },
    });

    const dbDeals = await Deal.find({
      _id: {
        $in: dealIds,
      },
    });

    const normalizedItems = items.map((item: any) => {
      const quantity = Number(item.quantity ?? 1);

      // Deal order item
      if (item.itemType === "Deal") {
        const deal = dbDeals.find(
          (dbDeal) =>
            String(dbDeal._id) === String(item.dealId)
        );

        if (!deal) {
          throw new Error("One or more deals were not found.");
        }

        const price = Number(
          deal.discountedPrice ?? deal.price ?? 0
        );

        return {
          dealId: deal._id,
          itemType: "Deal",
          name: deal.name,
          category: deal.category,
          image: deal.images?.[0] ?? "",
          price,
          quantity,
          lineTotal: price * quantity,
        };
      }

      // Existing product order item
      const product = dbProducts.find(
        (dbProduct) =>
          String(dbProduct._id) ===
          String(item.productId || item._id)
      );

      if (!product) {
        throw new Error("One or more products were not found.");
      }

      const price = Number(
        product.discountedPrice ??
          product.price ??
          item.price ??
          0
      );

      return {
        productId: product._id,
        itemType: "Product",
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
        {
          success: false,
          message: "Customer name is required.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      !shippingAddress?.address ||
      !shippingAddress?.city ||
      !shippingAddress?.country
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Shipping address is required.",
        },
        {
          status: 400,
        }
      );
    }

    const subtotal = normalizedItems.reduce(
      (sum, item) => sum + item.lineTotal,
      0
    );

    const total =
      subtotal + Number(deliveryCharges || 0);

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
          createdAt:
            orderData.createdAt?.toISOString?.() ??
            orderData.createdAt,
          updatedAt:
            orderData.updatedAt?.toISOString?.() ??
            orderData.updatedAt,
        },
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("Create Order Error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Something went wrong.",
      },
      {
        status: 500,
      }
    );
  }
}


/**
 * GET - Fetch all orders
 */
export async function GET() {
  try {
    await connectDB();

    const orders = await Order.find().sort({
      createdAt: -1,
    });

    return NextResponse.json(
      {
        success: true,
        orders,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Fetch Orders Error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Something went wrong.",
      },
      {
        status: 500,
      }
    );
  }
}

/**
 * PUT - Update order status
 */
export async function PUT(req: Request) {
  try {
    await connectDB();

    const { id, status } = await req.json();

    if (!id || !status) {
      return NextResponse.json(
        {
          success: false,
          message: "Order id and status are required.",
        },
        {
          status: 400,
        }
      );
    }

    const validStatuses = [
      "Pending",
      "Processing",
      "Shipped",
      "Delivered",
      "Cancelled",
    ];

    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid order status.",
        },
        {
          status: 400,
        }
      );
    }

    const order = await Order.findById(id);

    if (!order) {
      return NextResponse.json(
        {
          success: false,
          message: "Order not found.",
        },
        {
          status: 404,
        }
      );
    }

    order.status = status;

    await order.save();

    return NextResponse.json(
      {
        success: true,
        message: "Order status updated successfully.",
        order,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Update Order Error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Something went wrong.",
      },
      {
        status: 500,
      }
    );
  }
}