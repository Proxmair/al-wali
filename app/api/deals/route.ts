import { NextResponse } from "next/server";
import { put, del } from "@vercel/blob";

import { connectDB } from "@/lib/mongodb";
import Deal from "@/models/Deal";

/**
 * GET - Fetch all deals
 */
export async function GET() {
  try {
    await connectDB();

    const deals = await Deal.find().sort({
      createdAt: -1,
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
    console.error("Get Deals Error:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : error,
      },
      {
        status: 500,
      }
    );
  }
}

/**
 * POST - Create a new deal
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

    const dealHeading = formData.get(
      "dealHeading"
    ) as string;

    const dealDescription = formData.get(
      "dealDescription"
    ) as string;

    const dealDiscountPrice = Number(
      formData.get("dealDiscountPrice")
    );

    const files = formData.getAll(
      "images"
    ) as File[];

    if (
      !name ||
      !category ||
      !price ||
      !discountedPrice ||
      !dealHeading ||
      !dealDescription ||
      !dealDiscountPrice ||
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
        `deals/${Date.now()}-${file.name}`,
        file,
        {
          access: "public",
        }
      );

      imageUrls.push(blob.url);
    }

    const deal = await Deal.create({
      name,
      category,
      price,
      discountedPrice,
      rating,

      dealHeading,
      dealDescription,
      dealDiscountPrice,

      images: imageUrls,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Deal added successfully.",
        deal,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("Create Deal Error:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : error,
      },
      {
        status: 500,
      }
    );
  }
}

/**
 * PUT - Update existing deal
 */
export async function PUT(req: Request) {
  try {
    await connectDB();

    const formData = await req.formData();

    const id = formData.get("id") as string;

    const name = formData.get("name") as string;
    const category = formData.get("category") as string;

    const price = Number(formData.get("price"));

    const discountedPrice = Number(
      formData.get("discountedPrice")
    );

    const rating = Number(formData.get("rating"));

    const dealHeading = formData.get(
      "dealHeading"
    ) as string;

    const dealDescription = formData.get(
      "dealDescription"
    ) as string;

    const dealDiscountPrice = Number(
      formData.get("dealDiscountPrice")
    );

    const files = formData.getAll(
      "images"
    ) as File[];

    if (
      !id ||
      !name ||
      !category ||
      !price ||
      !discountedPrice ||
      !dealHeading ||
      !dealDescription ||
      !dealDiscountPrice
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

    const deal = await Deal.findById(id);

    if (!deal) {
      return NextResponse.json(
        {
          success: false,
          message: "Deal not found.",
        },
        {
          status: 404,
        }
      );
    }

    let imageUrls = deal.images;

    // Replace images only when new files are uploaded
    if (files.length > 0) {
      if (deal.images?.length) {
        await Promise.all(
          deal.images.map(
            async (url: string) => {
              try {
                await del(url);
              } catch (err) {
                console.error(
                  "Failed deleting old image:",
                  err
                );
              }
            }
          )
        );
      }

      imageUrls = [];

      for (const file of files) {
        const blob = await put(
          `deals/${Date.now()}-${file.name}`,
          file,
          {
            access: "public",
          }
        );

        imageUrls.push(blob.url);
      }
    }

    deal.name = name;
    deal.category = category;

    deal.price = price;
    deal.discountedPrice = discountedPrice;
    deal.rating = rating;

    deal.dealHeading = dealHeading;
    deal.dealDescription = dealDescription;
    deal.dealDiscountPrice =
      dealDiscountPrice;

    deal.images = imageUrls;

    await deal.save();

    return NextResponse.json(
      {
        success: true,
        message: "Deal updated successfully.",
        deal,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Update Deal Error:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : error,
      },
      {
        status: 500,
      }
    );
  }
}

/**
 * DELETE - Delete a deal
 */
export async function DELETE(req: Request) {
  try {
    await connectDB();

    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "Deal id is required.",
        },
        {
          status: 400,
        }
      );
    }

    const deal = await Deal.findById(id);

    if (!deal) {
      return NextResponse.json(
        {
          success: false,
          message: "Deal not found.",
        },
        {
          status: 404,
        }
      );
    }

    // Delete images from Vercel Blob
    if (deal.images?.length) {
      await Promise.all(
        deal.images.map(async (url: string) => {
          try {
            await del(url);
          } catch (err) {
            console.error(
              "Failed deleting blob:",
              url,
              err
            );
          }
        })
      );
    }

    await Deal.findByIdAndDelete(id);

    return NextResponse.json(
      {
        success: true,
        message: "Deal deleted successfully.",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Delete Deal Error:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : error,
      },
      {
        status: 500,
      }
    );
  }
}