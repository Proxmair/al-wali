"use client";

import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X, Search, MessageCircle } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import OrderModal from "./OrderModal";

interface TrackOrderModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onTrack?: (orderNumber: string) => void;
}

export function TrackOrderModal({
  open,
  onOpenChange,
  onTrack,
}: TrackOrderModalProps) {
  const [orderNumber, setOrderNumber] = React.useState("");
  const [orderModalOpen, setOrderModalOpen] = React.useState(false);
    const [selectedOrder, setSelectedOrder] = React.useState<any>(null);

  const handleTrack = async () => {
  if (!orderNumber.trim()) return;

  try {
    const res = await fetch("/api/orders/track", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderNumber: orderNumber.trim(),
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message);
      return;
    }

    if (onTrack) {
      onTrack(data.order);
    }

    setSelectedOrder(data.order);
    setOrderModalOpen(true);

    console.log(data.order);
  } catch (error) {
    console.error(error);
    alert("Something went wrong.");
  }
}

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md data-[state=open]:animate-in data-[state=closed]:animate-out" />

        <Dialog.Content
          className={cn(
            "fixed left-1/2 top-1/2 z-50 w-[95vw] max-w-md",
            "-translate-x-1/2 -translate-y-1/2",
            "rounded-2xl border bg-background shadow-2xl",
            "focus:outline-none"
          )}
        >
          <div className="relative p-6">
            <Dialog.Close asChild>
              <button
                className="absolute right-4 top-4 rounded-md p-2 transition hover:bg-muted"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </Dialog.Close>

            <Dialog.Title className="text-center text-2xl font-bold">
              Track Your Order
            </Dialog.Title>

            <Dialog.Description className="mt-2 text-center text-sm text-muted-foreground">
              Enter your Order Number below to view the latest status of your
              order.
            </Dialog.Description>

            <div className="mt-8 space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="order-number"
                  className="text-sm font-medium"
                >
                  Order Number
                </label>

                <Input
                  id="order-number"
                  placeholder="e.g. ORD-123456"
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleTrack();
                    }
                  }}
                />
              </div>

              <Button
                className="w-full"
                onClick={handleTrack}
                disabled={!orderNumber.trim()}
              >
                Track Order
              </Button>
            </div>

            <div className="mt-8 rounded-xl border bg-muted/40 p-4">
              <div className="flex items-start gap-3">
                <MessageCircle className="mt-0.5 h-5 w-5 text-green-600" />

                <div className="space-y-2">
                  <p className="text-sm font-medium">
                    Forgot your Order Number?
                  </p>

                  <p className="text-sm text-muted-foreground">
                    No worries. Send us a message on WhatsApp and our support
                    team will help you locate your order as quickly as possible.
                  </p>

                  <a
                    href="https://wa.me/1234567890"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center font-medium text-green-600 transition hover:underline"
                  >
                    Contact our WhatsApp Helpline
                  </a>
                </div>
              </div>
            </div>
          </div>
          <OrderModal
            open={orderModalOpen}
            onOpenChange={setOrderModalOpen}
            order={selectedOrder}
          />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}