import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import Deal from "@/models/Deal";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { ids } = await req.json();

    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Deal ids are required.",
        },
        {
          status: 400,
        }
      );
    }

    const deals = await Deal.find({
      _id: {
        $in: ids,
      },
    });

    return NextResponse.json(
      {
        success: true,
        deals,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Fetch Cart Deals Error:", error);

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