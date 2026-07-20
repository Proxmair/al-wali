import { NextResponse } from "next/server";
import { put, del } from "@vercel/blob";

import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";

/**
 * GET - Fetch all products
 */
export async function GET() {
  try {
    await connectDB();

    const products = await Product.find().sort({
      createdAt: -1,
    });

    return NextResponse.json(
      {
        success: true,
        products,
      },
      {
        status: 200,
      }
    );
  }  catch (error) {
    console.error("Login Error:", error);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : error,
      },
      { status: 500 }
    );
  }
}

/**
 * POST - Create a new product
 */
export async function POST(req: Request) {
  try {
    await connectDB();

    const formData = await req.formData();

    const name = formData.get("name") as string;
    const category = formData.get("category") as string;

    const price = Number(formData.get("price"));
    const discountedPrice = Number(
      formData.get("discountedPrice")
    );

    const rating = Number(formData.get("rating"));

    const files = formData.getAll("images") as File[];

    if (
      !name ||
      !category ||
      !price ||
      !discountedPrice ||
      files.length === 0
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required fields.",
        },
        {
          status: 400,
        }
      );
    }

    const imageUrls: string[] = [];

    for (const file of files) {
      const blob = await put(
        `products/${Date.now()}-${file.name}`,
        file,
        {
          access: "public",
        }
      );

      imageUrls.push(blob.url);
    }

    const product = await Product.create({
      name,
      category,
      price,
      discountedPrice,
      rating,
      images: imageUrls,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Product added successfully.",
        product,
      },
      {
        status: 201,
      }
    );
  }  catch (error) {
    console.error("Login Error:", error);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : error,
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE - Delete a product
 */
export async function DELETE(req: Request) {
  try {
    await connectDB();

    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "Product id is required.",
        },
        {
          status: 400,
        }
      );
    }

    const product = await Product.findById(id);

    if (!product) {
      return NextResponse.json(
        {
          success: false,
          message: "Product not found.",
        },
        {
          status: 404,
        }
      );
    }

    // Delete all images from Vercel Blob
    if (product.images?.length) {
      await Promise.all(
        product.images.map(async (url: string) => {
          try {
            await del(url);
          } catch (err) {
            console.error("Failed to delete blob:", url, err);
          }
        })
      );
    }

    await Product.findByIdAndDelete(id);

    return NextResponse.json(
      {
        success: true,
        message: "Product deleted successfully.",
      },
      {
        status: 200,
      }
    );
  }  catch (error) {
    console.error("Login Error:", error);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : error,
      },
      { status: 500 }
    );
  }
}