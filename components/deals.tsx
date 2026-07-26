"use client";

import { useEffect, useState } from "react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tag, Loader2 } from "lucide-react";
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

export default function Deals() {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);
  const [isBuyNowModalOpen, setIsBuyNowModalOpen] = useState(false);
  const [selectedDealId, setSelectedDealId] = useState<string>("");

  const fetchDeals = async () => {
    try {
      setLoading(true);

      const response = await fetch("/api/deals");

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch deals"
        );
      }

      setDeals(data.deals || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDeals();
  }, []);

   const handleBuyNowClick = (deal:Deal) => {
        setIsBuyNowModalOpen(true);
        setSelectedDealId(deal._id);
    }
  

  return (
    <section
      id="deals"
      className="py-16 md:py-24 px-4 bg-background mb-550 xl:mb-140"
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

        {loading ? (
          <div className="h-160 flex items-center justify-center">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Loader2 className="w-5 h-5 animate-spin" />
              Loading deals...
            </div>
          </div>
        ) : deals.length === 0 ? (
          <div className="h-160 flex items-center justify-center text-muted-foreground">
            No deals available.
          </div>
        ) : (
          <div className="absolute left-0 w-[98vw] grid grid-cols-1 xl:grid-cols-2 gap-0.5 xl:h-160 h-550">
            {deals.map((deal) => (
              <Card
                key={deal._id}
                className="relative overflow-hidden rounded-none border-0 shadow-lg hover:shadow-xl transition-shadow bg-center bg-cover bg-no-repeat"
                style={{
                  backgroundImage: `url(${deal.images?.[0]})`,
                }}
              >
                {/* Badge */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur text-foreground px-4 py-2 rounded-full flex items-center gap-2">
                  <Tag className="w-4 h-4" />

                  <span className="font-bold text-sm">
                    ${deal.dealDiscountPrice} OFF
                  </span>
                </div>

                {/* Content */}
                <div className="p-8 h-full flex flex-col justify-between">
                  <div className="bg-black/50 text-white p-4 rounded-lg w-fit">
                    <h3 className="text-4xl mb-4 text-balance">
                      {deal.dealHeading}
                    </h3>

                    <p className="text-base leading-relaxed opacity-90">
                      {deal.dealDescription}
                    </p>

                    <p className="mt-3 text-sm">
                      {deal.name}
                    </p>
                  </div>

                  <Button
                    className="mt-6 w-full bg-white text-foreground hover:bg-white/90 font-semibold"
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