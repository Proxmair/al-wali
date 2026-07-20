"use client";

import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X, ShoppingCart } from "lucide-react";
import { useSelector } from "react-redux";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { RootState } from "@/store";
import { Product } from "../ProductCard";

interface CartModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CartModal = ({ open, onOpenChange }: CartModalProps) => {
  const selectedCartIds = useSelector(
    (state: RootState) => state.counter.cart.ids
  );

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) return;

    if (selectedCartIds.length === 0) {
      setProducts([]);
      return;
    }

    const fetchProducts = async () => {
      try {
        setLoading(true);

        const res = await fetch("/api/products/cart", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ids: selectedCartIds,
          }),
        });

        const data = await res.json();

        setProducts(data.products ?? []);
      } catch (error) {
        console.error(error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [open, selectedCartIds]);

  const subtotal = products.reduce(
    (sum, product) => sum + product.discountedPrice,
    0
  );

  const deliveryCharges = products.length > 0 ? 150 : 0;

  const total = subtotal + deliveryCharges;

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm" />

        <Dialog.Content
          className={cn(
            "fixed left-1/2 top-1/2 z-50",
            "w-[95vw] max-w-2xl",
            "-translate-x-1/2 -translate-y-1/2",
            "rounded-2xl border bg-background shadow-2xl",
            "focus:outline-none"
          )}
        >
          <div className="relative p-6">
            <Dialog.Close asChild>
              <button className="absolute right-4 top-4 rounded-md p-2 hover:bg-muted">
                <X className="h-5 w-5" />
              </button>
            </Dialog.Close>

            <div className="mb-6 flex items-center gap-3">
              <ShoppingCart className="h-6 w-6" />

              <div>
                <Dialog.Title className="text-2xl font-bold">
                  Shopping Cart
                </Dialog.Title>

                <Dialog.Description className="text-muted-foreground">
                  {selectedCartIds.length} item(s) in your cart
                </Dialog.Description>
              </div>
            </div>

            {loading && (
              <div className="py-12 text-center">Loading products...</div>
            )}

            {!loading && products.length === 0 && (
              <div className="py-12 text-center text-muted-foreground">
                Your cart is empty.
              </div>
            )}

            {!loading && products.length > 0 && (
              <div className="space-y-6">
                <div className="max-h-[420px] space-y-4 overflow-y-auto pr-2">
                  {products.map((product) => (
                    <div
                      key={product._id}
                      className="flex gap-4 rounded-xl border p-4"
                    >
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="h-28 w-28 rounded-lg border object-cover"
                      />

                      <div className="flex flex-1 flex-col justify-between">
                        <div>
                          <h3 className="text-lg font-semibold">
                            {product.name}
                          </h3>

                          <p className="text-sm capitalize text-muted-foreground">
                            {product.category}
                          </p>

                          <div className="mt-2 flex items-center gap-2">
                            <span className="text-lg font-bold text-primary">
                              PKR {product.discountedPrice.toLocaleString()}
                            </span>

                            {product.discountedPrice !== product.price && (
                              <span className="text-sm text-muted-foreground line-through">
                                PKR {product.price.toLocaleString()}
                              </span>
                            )}
                          </div>

                          <div className="mt-2 flex items-center gap-1">
                            <span className="text-sm font-medium">
                              ⭐ {product.rating.toFixed(1)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="rounded-xl border bg-muted/30 p-5">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        Subtotal ({products.length} items)
                      </span>

                      <span className="font-medium">
                        PKR {subtotal.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        Delivery Charges
                      </span>

                      <span className="font-medium">
                        PKR {deliveryCharges.toLocaleString()}
                      </span>
                    </div>

                    <div className="border-t pt-3">
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-semibold">Total</span>

                        <span className="text-2xl font-bold text-primary">
                          PKR {total.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <Button
                    size="lg"
                    className="mt-5 w-full"
                    onClick={() => {
                      // TODO: Proceed to checkout
                    }}
                  >
                    Proceed to Checkout
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};