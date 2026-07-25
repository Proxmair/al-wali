"use client";

import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Product } from "../ProductCard";
import { RootState } from "@/store";
import { clearCart } from "@/store/slices/counterSlice";
import OrderModal, { OrderResponse } from "./OrderModal";

interface BuyNowModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedProductId?: string;
}

export default function BuyNowModal({ open, onOpenChange, selectedProductId }: BuyNowModalProps) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [apartmentNo, setApartmentNo] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country] = useState("Pakistan");
  const [paymentMethod] = useState("Cash on Delivery");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [order, setOrder] = useState<OrderResponse | null>(null);

  const [rememberContact, setRememberContact] = useState(true);
  const [rememberAddress, setRememberAddress] = useState(true);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.trim() && !phone.trim()) {
      alert("Please enter either an email address or a phone number.");
      return;
    }

    if (!firstName.trim() || !lastName.trim() || !address.trim() || !city.trim()) {
      alert("Please fill in all required delivery fields.");
      return;
    }

    try {
      setIsSubmitting(true);
      setOrder(null);

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: products.map((product) => ({
            productId: product._id,
            quantity: 1,
          })),
          customer: {
            firstName,
            lastName,
            email,
            phone,
          },
          shippingAddress: {
            country,
            address,
            apartmentNo,
            city,
            postalCode,
          },
          paymentMethod,
          deliveryCharges,
          note: "",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to place order.");
      }

      setOrder(data.order ?? null);
      setSuccessOpen(true);
      onOpenChange(false);
      dispatch(clearCart());

    } catch (error) {
      console.error(error);
      alert(error instanceof Error ? error.message : "Failed to place order.");
    } finally {
      setIsSubmitting(false);
    }
  };
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const selectedCartIds = useSelector(
    (state: RootState) => state.counter.cart.ids
  );
  useEffect(() => {
    if (!open) return;

    const idsToLoad = selectedProductId ? [selectedProductId] : selectedCartIds;

    if (idsToLoad.length === 0) {
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
            ids: idsToLoad,
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
  }, [open, selectedCartIds, selectedProductId]);
  const subtotal = products.reduce(
    (sum, product) => sum + product.discountedPrice,
    0
  );

  const deliveryCharges = subtotal > 3000 ? 0 : products.length > 0 ? 150 : 0;

  const total = subtotal + deliveryCharges;

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md" />

        <Dialog.Content
          className={cn(
            "fixed left-1/2 top-1/2 z-50",
            "max-h-[90vh] w-[95vw] max-w-5xl",
            "-translate-x-1/2 -translate-y-1/2",
            "overflow-y-auto rounded-2xl border bg-background shadow-2xl",
            "focus:outline-none"
          )}
        >
          <div className="flex flex-row">
            <div className="relative p-6">
              <Dialog.Close asChild>
                <button
                  className="absolute right-4 top-4 rounded-md p-2 hover:bg-muted"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>
              </Dialog.Close>

              <Dialog.Title className="text-3xl font-bold text-center">
                Checkout
              </Dialog.Title>

              <Dialog.Description className="mt-2 text-sm text-muted-foreground text-center">
                Complete your delivery information to place your order.
              </Dialog.Description>

              <form className="mt-8 space-y-8" onSubmit={handleSubmit}>
                {/* Contact Information */}
                <div className="space-y-4 rounded-xl border p-5">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold">
                      Contact Information
                    </h2>

                    <label className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={rememberContact}
                        onChange={(e) => setRememberContact(e.target.checked)}
                      />
                      Remember information
                    </label>
                  </div>

                  <p className="text-sm text-muted-foreground">
                    Enter your email address, phone number, or both.
                  </p>

                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Contact Email Address
                    </label>

                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="h-11 w-full rounded-lg border px-3 outline-none focus:ring-2"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Phone Number
                    </label>

                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+92 300 1234567"
                      className="h-11 w-full rounded-lg border px-3 outline-none focus:ring-2"
                    />
                  </div>

                  {!email.trim() && !phone.trim() && (
                    <p className="text-sm text-red-500">
                      Please provide at least an email address or a phone
                      number.
                    </p>
                  )}
                </div>

                {/* Delivery Address */}
                <div className="space-y-4 rounded-xl border p-5">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold">Delivery Address</h2>

                    <label className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={rememberAddress}
                        onChange={(e) => setRememberAddress(e.target.checked)}
                      />
                      Remember address
                    </label>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Country
                    </label>

                    <input
                      value={country}
                      readOnly
                      className="h-11 w-full rounded-lg border bg-muted/40 px-3 text-sm"
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        First Name *
                      </label>

                      <input
                        required
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="h-11 w-full rounded-lg border px-3"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        Last Name *
                      </label>

                      <input
                        required
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="h-11 w-full rounded-lg border px-3"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Address *
                    </label>

                    <input
                      required
                      placeholder="Street Address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="h-11 w-full rounded-lg border px-3"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Apartment No. (Optional)
                    </label>

                    <input
                      placeholder="Apartment / Floor / House No."
                      value={apartmentNo}
                      onChange={(e) => setApartmentNo(e.target.value)}
                      className="h-11 w-full rounded-lg border px-3"
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        City
                      </label>

                      <input
                        placeholder="City name"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="h-11 w-full rounded-lg border px-3"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Postal Code
                    </label>

                    <input
                      placeholder="Postal Code"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      className="h-11 w-full rounded-lg border px-3"
                    />
                  </div>
                </div>

                {/* Payment Information */}
                <div className="space-y-4 rounded-xl border p-5">
                  <h2 className="text-lg font-semibold">Payment Information</h2>

                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Payment Method
                    </label>

                    <input
                      value={paymentMethod}
                      readOnly
                      className="h-11 w-full rounded-lg border bg-muted/40 px-3 text-sm"
                    />
                  </div>
                </div>

                <Button type="submit" className="h-12 w-full text-base" disabled={isSubmitting}>
                  {isSubmitting ? "Placing Order..." : "Place Order"}
                </Button>
              </form>
            </div>

            {loading ? (
              <div className="py-12 text-center">Loading products...</div>
            ) : (
              <div className="w-full border-l bg-muted/20 lg:w-95">
                <div className="sticky top-0 p-6">
                  <h2 className="mb-6 text-2xl font-bold">Order Summary</h2>

                  <div className="max-h-105 space-y-4 overflow-y-auto pr-2">
                    {products.map((product) => (
                      <div
                        key={product._id}
                        className="flex gap-3 rounded-xl border bg-background p-3"
                      >
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="h-20 w-20 rounded-lg border object-cover"
                        />

                        <div className="flex-1">
                          <h3 className="font-semibold line-clamp-2">
                            {product.name}
                          </h3>

                          <p className="text-xs capitalize text-muted-foreground">
                            {product.category}
                          </p>

                          <div className="mt-2 flex items-center gap-2">
                            <span className="font-bold text-primary">
                              PKR {product.discountedPrice.toLocaleString()}
                            </span>

                            {product.price !== product.discountedPrice && (
                              <span className="text-xs line-through text-muted-foreground">
                                PKR {product.price.toLocaleString()}
                              </span>
                            )}
                          </div>

                          <div className="mt-1 text-xs">
                            ⭐ {product.rating.toFixed(1)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 rounded-xl border bg-background p-5">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Subtotal ({products.length})
                        </span>

                        <span>PKR {subtotal.toLocaleString()}</span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Delivery</span>

                        <span>PKR {deliveryCharges.toLocaleString()}</span>
                      </div>

                      <div className="border-t pt-3">
                        <div className="flex justify-between text-lg font-bold">
                          <span>Total</span>

                          <span className="text-primary">
                            PKR {total.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>

      <OrderModal
        open={successOpen}
        onOpenChange={setSuccessOpen}
        order={order}
        message="Your order has been placed successfully. Here are the details of your order."
      />
    </Dialog.Root>
  );
}
