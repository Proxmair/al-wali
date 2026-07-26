import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import { put } from "@vercel/blob";
import Misc from "@/models/Misc";


export async function GET() {
  try {
    await connectDB();

    const misc = await Misc.findOne();

    return NextResponse.json(
      {
        success: true,
        misc: misc ?? {
          bannerText: "",
          bannerDesktopImage: "",
          bannerMobileImage: "",
        },
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Fetch Misc Error:", error);

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


export async function PUT(req: Request) {
  try {
    await connectDB();

    const formData = await req.formData();

    const bannerText =
      String(formData.get("bannerText") || "");

    const desktopImage =
      formData.get(
        "bannerDesktopImage"
      ) as File | null;

    const mobileImage =
      formData.get(
        "bannerMobileImage"
      ) as File | null;


    const existing = await Misc.findOne();


    let bannerDesktopImage =
      existing?.bannerDesktopImage || "";

    let bannerMobileImage =
      existing?.bannerMobileImage || "";


    if (desktopImage instanceof File) {
      const blob = await put(
        `misc/desktop-${Date.now()}-${desktopImage.name}`,
        desktopImage,
        {
          access: "public",
        }
      );

      bannerDesktopImage = blob.url;
    }


    if (mobileImage instanceof File) {
      const blob = await put(
        `misc/mobile-${Date.now()}-${mobileImage.name}`,
        mobileImage,
        {
          access: "public",
        }
      );

      bannerMobileImage = blob.url;
    }


    const miscData = {
      bannerText,
      bannerDesktopImage,
      bannerMobileImage,
    };


    let misc;

    if (existing) {
      existing.bannerText = bannerText;
      existing.bannerDesktopImage =
        bannerDesktopImage;
      existing.bannerMobileImage =
        bannerMobileImage;

      misc = await existing.save();
    } else {
      misc = await Misc.create(
        miscData
      );
    }


    return NextResponse.json(
      {
        success: true,
        message:
          "Misc settings updated successfully.",
        misc,
      },
      {
        status: 200,
      }
    );

  } catch (error) {
    console.error(
      "Update Misc Error:",
      error
    );

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