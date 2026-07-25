"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { X, CheckCircle2, Package } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export interface OrderItem {
  productId: string;
  name: string;
  category: string;
  image: string;
  price: number;
  quantity: number;
  lineTotal: number;
}

export interface OrderResponse {
  id: string;
  orderNumber: string;
  status: string;
  paymentMethod: string;
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  shippingAddress: {
    country: string;
    address: string;
    apartmentNo: string;
    city: string;
    area: string;
    postalCode: string;
  };
  items: OrderItem[];
  subtotal: number;
  deliveryCharges: number;
  total: number;
  note: string;
  createdAt: string;
  updatedAt: string;
}

interface OrderModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  order: OrderResponse | null;
  message?: string;
}

export default function OrderModal({
  open,
  onOpenChange,
  order,
  message = "Your order has been placed successfully.",
}: OrderModalProps) {
  const customer = order?.customer;
  const shippingAddress = order?.shippingAddress;
  const items = order?.items ?? [];

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-md" />

        <Dialog.Content
          className={cn(
            "fixed left-1/2 top-1/2 z-[60]",
            "w-[95vw] max-w-3xl max-h-[90vh]",
            "-translate-x-1/2 -translate-y-1/2",
            "overflow-y-auto rounded-2xl border bg-background shadow-2xl",
            "focus:outline-none"
          )}
        >
          <div className="p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-green-100 p-2 text-green-700">
                  <CheckCircle2 className="h-6 w-6" />
                </div>

                <div>
                  <Dialog.Title className="text-2xl font-bold">
                    Order Placed Successfully
                  </Dialog.Title>

                  <Dialog.Description className="mt-1 text-sm text-muted-foreground">
                    {message}
                  </Dialog.Description>
                </div>
              </div>

              <Dialog.Close asChild>
                <button
                  className="rounded-md p-2 hover:bg-muted"
                  aria-label="Close order modal"
                >
                  <X className="h-5 w-5" />
                </button>
              </Dialog.Close>
            </div>

            {!order ? (
              <div className="mt-8 rounded-xl border p-6 text-center text-muted-foreground">
                No order details available.
              </div>
            ) : (
              <div className="mt-6 space-y-6">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="rounded-xl border bg-muted/20 p-4">
                    <p className="text-sm text-muted-foreground">Order Number</p>
                    <p className="mt-1 text-lg font-semibold">
                      {order?.orderNumber ?? "N/A"}
                    </p>
                  </div>

                  <div className="rounded-xl border bg-muted/20 p-4">
                    <p className="text-sm text-muted-foreground">Status</p>
                    <p className="mt-1 text-lg font-semibold">
                      {order?.status ?? "N/A"}
                    </p>
                  </div>

                  <div className="rounded-xl border bg-muted/20 p-4">
                    <p className="text-sm text-muted-foreground">Payment Method</p>
                    <p className="mt-1 text-lg font-semibold">
                      {order?.paymentMethod ?? "N/A"}
                    </p>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <div className="rounded-xl border bg-muted/20 p-4 md:col-span-3">
                    <p className="text-sm text-muted-foreground">Total Price</p>
                    <p className="mt-1 text-lg font-semibold text-primary">
                      PKR {(order?.total ?? 0).toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-xl border p-4">
                    <h3 className="mb-3 text-base font-semibold">Customer</h3>
                    <div className="space-y-1 text-sm">
                      <p>
                        {customer
                          ? `${customer.firstName ?? ""} ${customer.lastName ?? ""}`.trim()
                          : "N/A"}
                      </p>
                      <p>{customer?.email ?? "N/A"}</p>
                      <p>{customer?.phone ?? "N/A"}</p>
                    </div>
                  </div>

                  <div className="rounded-xl border p-4">
                    <h3 className="mb-3 text-base font-semibold">Shipping Address</h3>
                    <div className="space-y-1 text-sm">
                      <p>{shippingAddress?.address ?? "N/A"}</p>
                      {shippingAddress?.apartmentNo ? (
                        <p>{shippingAddress.apartmentNo}</p>
                      ) : null}
                      <p>
                        {shippingAddress?.city ?? "N/A"}
                        {shippingAddress?.postalCode
                          ? `, ${shippingAddress.postalCode}`
                          : ""}
                      </p>
                      <p>{shippingAddress?.country ?? "N/A"}</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border p-4">
                  <div className="flex items-center gap-2">
                    <Package className="h-4 w-4 text-primary" />
                    <h3 className="text-base font-semibold">Order Items</h3>
                  </div>

                  <div className="mt-4 space-y-3">
                    {items.map((item) => (
                      <div
                        key={item.productId}
                        className="flex items-center gap-3 rounded-xl border bg-background p-3"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-14 w-14 rounded-lg border object-cover"
                        />

                        <div className="min-w-0 flex-1">
                          <p className="truncate font-semibold">{item.name}</p>
                          <p className="text-xs capitalize text-muted-foreground">
                            {item.category}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Qty: {item.quantity}
                          </p>
                        </div>

                        <div className="text-right text-sm">
                          <p className="font-semibold">
                            PKR {(item.lineTotal ?? 0).toLocaleString()}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Unit: PKR {(item.price ?? 0).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid gap-3 rounded-xl border bg-muted/20 p-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>PKR {(order?.subtotal ?? 0).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Delivery Charges</span>
                    <span>
                      PKR {(order?.deliveryCharges ?? 0).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between border-t pt-3 text-base font-semibold">
                    <span>Total</span>
                    <span className="text-primary">
                      PKR {(order?.total ?? 0).toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Dialog.Close asChild>
                    <Button type="button" className="px-6">
                      Close
                    </Button>
                  </Dialog.Close>
                </div>
              </div>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
