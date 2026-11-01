"use client";

import { useState } from "react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tag } from "lucide-react";
import BuyNowModal from "./modals/BuyNowModal";

interface Deal {
  _id: string;
  name: string;
  category: string;

  price: number;
  discountedPrice: number;
  rating: number;

  images: string[];

  dealHeading: string;
  dealDescription: string;
  dealDiscountPrice: number;
}

export default function Deals({ deals }: { deals: Deal[] }) {
  const [isBuyNowModalOpen, setIsBuyNowModalOpen] = useState(false);
  const [selectedDealId, setSelectedDealId] = useState<string>("");

   const handleBuyNowClick = (deal:Deal) => {
        setIsBuyNowModalOpen(true);
        setSelectedDealId(deal._id);
    }
  

  return (
    <section
      id="deals"
      className="py-16 md:py-24 px-4 bg-background mb-200 xl:mb-140"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-7xl text-amber-950 font-bold mb-4">
            Exclusive Deals
          </h2>

          <p className="text-lg text-foreground/70 font-bold">
            Limited time offers on our finest fragrances
          </p>
        </div>

        {deals.length === 0 ? (
          <div className="h-160 flex items-center justify-center text-muted-foreground">
            No deals available.
          </div>
        ) : (
<div className="absolute left-0 w-full grid grid-cols-1 xl:grid-cols-2 h-220 xl:h-160 ">
           {deals.map((deal) => (
  <Card
    key={deal._id}
    className="relative overflow-hidden h-100 border-0 shadow-lg hover:shadow-xl transition-shadow bg-center bg-cover bg-no-repeat mx-10 rounded-3xl"
  >
    {/* Desktop Background */}
    <div
      className="absolute inset-0 hidden sm:block bg-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url(${deal.images?.[0]})`,
      }}
    />

    {/* Mobile Background */}
    <div
      className="absolute inset-0 block sm:hidden bg-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url(${deal.images?.[1] || deal.images?.[0]})`,
      }}
    />

    {/* Badge */}
    <div className="absolute top-4 right-4 bg-primary/50 backdrop-blur text-foreground px-4 py-2 rounded-full flex items-center gap-2 z-10">
      <Tag className="w-4 h-4" />

      <span className="font-bold text-sm">
        {deal.dealDiscountPrice} PKR OFF
      </span>
    </div>

    {/* Content */}
    <div className="relative z-10 p-8 h-full flex flex-col justify-between">
      <Button
        className="w-full bg-white text-foreground hover:bg-white/90 font-semibold mt-auto"
        onClick={() => handleBuyNowClick(deal)}
      >
        Buy Now
      </Button>
    </div>
  </Card>
))}
          </div>
        )}
      </div>
      <BuyNowModal selectedDealId={selectedDealId} open={isBuyNowModalOpen} onOpenChange={setIsBuyNowModalOpen} />
    </section>
  );
}
