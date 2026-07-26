"use client";

import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Loader2, Upload, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

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

interface DealModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedDeal?: Deal;
}

const DealModal = ({
  open,
  onOpenChange,
  selectedDeal,
}: DealModalProps) => {
  const isEditMode = !!selectedDeal;

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    discountedPrice: "",
    rating: "",

    dealHeading: "",
    dealDescription: "",
    dealDiscountPrice: "",
  });

  const [images, setImages] = useState<File[]>([]);

  useEffect(() => {
    if (selectedDeal) {
      setFormData({
        name: selectedDeal.name,
        category: selectedDeal.category,
        price: String(selectedDeal.price),
        discountedPrice: String(
          selectedDeal.discountedPrice
        ),
        rating: String(selectedDeal.rating),

        dealHeading: selectedDeal.dealHeading,
        dealDescription: selectedDeal.dealDescription,
        dealDiscountPrice: String(
          selectedDeal.dealDiscountPrice
        ),
      });
    } else {
      setFormData({
        name: "",
        category: "",
        price: "",
        discountedPrice: "",
        rating: "",

        dealHeading: "",
        dealDescription: "",
        dealDiscountPrice: "",
      });

      setImages([]);
    }
  }, [selectedDeal, open]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.files) return;

    setImages(Array.from(e.target.files));
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = new FormData();

      if (isEditMode && selectedDeal?._id) {
        data.append("id", selectedDeal._id);
      }

      Object.entries(formData).forEach(
        ([key, value]) => {
          data.append(key, value);
        }
      );

      if (images.length > 0) {
        images.forEach((image) => {
          data.append("images", image);
        });
      }

      const response = await fetch("/api/deals", {
        method: isEditMode ? "PUT" : "POST",
        body: data,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Something went wrong."
        );
      }

      setFormData({
        name: "",
        category: "",
        price: "",
        discountedPrice: "",
        rating: "",

        dealHeading: "",
        dealDescription: "",
        dealDiscountPrice: "",
      });

      setImages([]);

      onOpenChange(false);
    } catch (error: any) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog.Root
      open={open}
      onOpenChange={onOpenChange}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md data-[state=open]:animate-in data-[state=closed]:animate-out" />

        <Dialog.Content
          className={cn(
            "fixed left-1/2 top-1/2 z-50 w-[95vw] max-w-2xl",
            "-translate-x-1/2 -translate-y-1/2",
            "rounded-2xl border bg-background shadow-2xl",
            "focus:outline-none"
          )}
        >
          <div className="relative max-h-[90vh] overflow-y-auto p-6">
            <Dialog.Close asChild>
              <button
                className="absolute right-4 top-4 rounded-md p-2 transition hover:bg-muted"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </Dialog.Close>

            <Dialog.Title className="text-center text-2xl font-bold">
              {isEditMode
                ? "Edit Deal"
                : "Add Deal"}
            </Dialog.Title>

            <Dialog.Description className="mt-2 text-center text-sm text-muted-foreground">
              {isEditMode
                ? "Update the deal information."
                : "Fill in the deal information."}
            </Dialog.Description>

            <form
              onSubmit={handleSubmit}
              className="mt-8 space-y-5"
            >
              <div className="space-y-2">
                <Label>
                  Deal Heading
                </Label>

                <Input
                  name="dealHeading"
                  value={formData.dealHeading}
                  onChange={handleChange}
                  placeholder="Mega Summer Sale"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>
                  Deal Description
                </Label>

                <Textarea
                  name="dealDescription"
                  value={formData.dealDescription}
                  onChange={handleChange}
                  placeholder="Get amazing discounts..."
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>
                  Product Name
                </Label>

                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Product Name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>
                  Category
                </Label>

                <Input
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  placeholder="Category"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>
                    Original Price
                  </Label>

                  <Input
                    name="price"
                    type="number"
                    min="0"
                    value={formData.price}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>
                    Discounted Price
                  </Label>

                  <Input
                    name="discountedPrice"
                    type="number"
                    min="0"
                    value={formData.discountedPrice}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>
                    Deal Discount Price
                  </Label>

                  <Input
                    name="dealDiscountPrice"
                    type="number"
                    min="0"
                    value={
                      formData.dealDiscountPrice
                    }
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>
                    Rating
                  </Label>

                  <Input
                    name="rating"
                    type="number"
                    min="0"
                    max="5"
                    step="0.1"
                    value={formData.rating}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>
                  Deal Images
                </Label>

                <Input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  required={!isEditMode}
                />

                {images.length > 0 && (
                  <div className="rounded-lg border p-3 text-sm text-muted-foreground">
                    <div className="mb-2 flex items-center gap-2">
                      <Upload className="h-4 w-4" />
                      {images.length} image(s) selected
                    </div>

                    <ul className="space-y-1">
                      {images.map(
                        (image, index) => (
                          <li key={index}>
                            {image.name}
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                )}

                {isEditMode &&
                  images.length === 0 && (
                    <p className="text-xs text-muted-foreground">
                      Leave empty to keep existing images.
                    </p>
                  )}
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {isEditMode
                      ? "Updating Deal..."
                      : "Creating Deal..."}
                  </>
                ) : isEditMode ? (
                  "Update Deal"
                ) : (
                  "Add Deal"
                )}
              </Button>
            </form>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default DealModal;