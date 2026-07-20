import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { ids } = await req.json();

    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Product ids are required.",
        },
        {
          status: 400,
        }
      );
    }

    const products = await Product.find({
      _id: {
        $in: ids,
      },
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
  } catch (error) {
    console.error("Fetch Cart Products Error:", error);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : error,
      },
      {
        status: 500,
      }
    );
  }
}