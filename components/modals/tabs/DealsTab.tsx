"use client";

import { useEffect, useState } from "react";
import { Loader2, Pencil, Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import DealModal from "../DealModal";

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

  createdAt: string;
}

const DealsTab = () => {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [selectedDeal, setSelectedDeal] = useState<Deal>();

  const fetchDeals = async () => {
    try {
      setLoading(true);

      const response = await fetch("/api/deals");
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch deals.");
      }

      setDeals(data.deals);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDeals();
  }, []);

  const handleEditDeal = (deal: Deal) => {
    setSelectedDeal(deal);
    setOpenModal(true);
  };

  const handleDeleteDeal = async (id: string) => {
    try {

      const response = await fetch("/api/deals", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to delete deal.");
      }

      fetchDeals();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <DealModal
        selectedDeal={selectedDeal}
        open={openModal}
        onOpenChange={(open:boolean) => {
          setOpenModal(open);

          if (!open) {
            setSelectedDeal(undefined);
            fetchDeals();
          }
        }}
      />

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">
              Deals
            </h2>

            <p className="text-sm text-muted-foreground">
              Manage your deals and special offers.
            </p>
          </div>

          <Button onClick={() => setOpenModal(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Deal
          </Button>
        </div>

        <div className="overflow-hidden rounded-xl border">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium">
                    Heading
                  </th>

                  <th className="px-4 py-3 text-left text-sm font-medium">
                    Product
                  </th>

                  <th className="px-4 py-3 text-left text-sm font-medium">
                    Category
                  </th>

                  <th className="px-4 py-3 text-left text-sm font-medium">
                    Price
                  </th>

                  <th className="px-4 py-3 text-left text-sm font-medium">
                    Deal Price
                  </th>

                  <th className="px-4 py-3 text-left text-sm font-medium">
                    Rating
                  </th>

                  <th className="px-4 py-3 text-center text-sm font-medium">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="py-10 text-center"
                    >
                      <div className="flex items-center justify-center gap-2 text-muted-foreground">
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Loading deals...
                      </div>
                    </td>
                  </tr>
                ) : deals.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="py-10 text-center text-muted-foreground"
                    >
                      No deals found.
                    </td>
                  </tr>
                ) : (
                  deals.map((deal) => (
                    <tr
                      key={deal._id}
                      className="border-t hover:bg-muted/30"
                    >
                      <td className="px-4 py-3 font-medium">
                        {deal.dealHeading}
                      </td>

                      <td className="px-4 py-3">
                        {deal.name}
                      </td>

                      <td className="px-4 py-3">
                        {deal.category}
                      </td>

                      <td className="px-4 py-3">
                        ${deal.price}
                      </td>

                      <td className="px-4 py-3">
                        ${deal.dealDiscountPrice}
                      </td>

                      <td className="px-4 py-3">
                        {deal.rating}
                      </td>

                      <td className="px-4 py-3">
                        <div className="flex justify-center gap-2">
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() =>
                              handleEditDeal(deal)
                            }
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>

                          <Button
                            size="icon"
                            variant="ghost"
                            className="text-red-500 hover:text-red-600"
                            onClick={() =>
                              handleDeleteDeal(deal._id)
                            }
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default DealsTab;