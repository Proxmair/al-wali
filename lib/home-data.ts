import { unstable_cache } from "next/cache";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import Deal from "@/models/Deal";
import Misc from "@/models/Misc";

export type HomeProduct = { _id: string; name: string; category: string; price: number; discountedPrice: number; images: string[]; rating: number };
export type HomeDeal = HomeProduct & { dealHeading: string; dealDescription: string; dealDiscountPrice: number; isActive: boolean };
export type HomeMisc = { bannerText: string; bannerDesktopImage: string; bannerMobileImage: string };

const productData = (item: Record<string, any>): HomeProduct => ({ _id: item._id.toString(), name: item.name, category: item.category, price: item.price, discountedPrice: item.discountedPrice, images: item.images ?? [], rating: item.rating ?? 5 });

export const getHomeProducts = unstable_cache(async (): Promise<HomeProduct[]> => {
  await connectDB();
  return (await Product.find().sort({ createdAt: -1 }).lean()).map((item) => productData(item as Record<string, any>));
}, ["home-products"], { revalidate: 300, tags: ["products"] });

export const getHomeDeals = unstable_cache(async (): Promise<HomeDeal[]> => {
  await connectDB();
  return (await Deal.find().sort({ createdAt: -1 }).lean()).map((item) => ({ ...productData(item as Record<string, any>), dealHeading: item.dealHeading, dealDescription: item.dealDescription, dealDiscountPrice: item.dealDiscountPrice, isActive: item.isActive ?? false }));
}, ["home-deals"], { revalidate: 300, tags: ["deals"] });

export const getHomeMisc = unstable_cache(async (): Promise<HomeMisc> => {
  await connectDB();
  const misc = await Misc.findOne().lean();
  return { bannerText: misc?.bannerText ?? "", bannerDesktopImage: misc?.bannerDesktopImage ?? "", bannerMobileImage: misc?.bannerMobileImage ?? "" };
}, ["home-misc"], { revalidate: 300, tags: ["misc"] });
