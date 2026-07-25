"use client";

import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import * as Tabs from "@radix-ui/react-tabs";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";
import ProductsTab from './tabs/ProductsTab'
import OrdersTab from "./tabs/OrdersTab";
import DealsTab from "./tabs/DealsTab";
import MiscTab from "./tabs/MiscTab";

interface AdminPanelModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AdminPanelModal = ({
  open,
  onOpenChange,
}: AdminPanelModalProps) => {
  const [activeTab, setActiveTab] = useState("products");

  const tabs = [
    {
      id: "products",
      label: "Products",
      content: <ProductsTab />,
    },
    {
      id: "orders",
      label: "Orders",
      content: <OrdersTab />,
    },
    {
      id: "deals",
      label: "Deals",
      content: <DealsTab />,
    },
    {
      id: "misc",
      label: "Misc",
      content: <MiscTab />,
    },
  ];

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md" />

        <Dialog.Content
          className={cn(
            "fixed left-1/2 top-1/2 z-50",
            "w-[95vw] max-w-6xl",
            "-translate-x-1/2 -translate-y-1/2",
            "rounded-2xl border bg-background shadow-2xl",
            "focus:outline-none"
          )}
        >
          <div className="relative p-6">
            <Dialog.Close asChild>
              <button
                className="absolute right-4 top-4 rounded-md p-2 hover:bg-muted"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </Dialog.Close>

            <Dialog.Title className="text-2xl font-bold">
              Admin Panel
            </Dialog.Title>

            <Dialog.Description className="mt-2 text-sm text-muted-foreground">
              Manage products, orders, deals, and other settings.
            </Dialog.Description>

            <Tabs.Root
              value={activeTab}
              onValueChange={setActiveTab}
              className="mt-6"
            >
              <Tabs.List className="mb-6 flex border-b">
                {tabs.map((tab) => (
                  <Tabs.Trigger
                    key={tab.id}
                    value={tab.id}
                    className={cn(
                      "border-b-2 border-transparent px-4 py-2 text-sm font-medium transition-colors",
                      "data-[state=active]:border-primary data-[state=active]:text-primary"
                    )}
                  >
                    {tab.label}
                  </Tabs.Trigger>
                ))}
              </Tabs.List>

              {tabs.map((tab) => (
                <Tabs.Content
                  key={tab.id}
                  value={tab.id}
                  className="focus:outline-none"
                >
                  {tab.content}
                </Tabs.Content>
              ))}
            </Tabs.Root>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default AdminPanelModal;