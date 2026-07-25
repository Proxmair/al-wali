"use client";

import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X, User, Mail, Phone, LogOut } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { clearUser } from "@/store/slices/userSlice";
import { RootState } from "@/store";
import ProductModal from "./ProductModal";
import AdminPanelModal from "./AdminPanelModal"

interface UserModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UserModal({ open, onOpenChange }: UserModalProps) {
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.user.user);

  const [productModalOpen, setProductModalOpen] = useState(false);
  const [adminPanelOpen, setAdminPanelOpen] = useState(false);

  const handleLogout = () => {
    dispatch(clearUser());
    onOpenChange(false);
  };

  const handleAddProduct = () => {
    onOpenChange(false);
    setProductModalOpen(true);
  };

  const handleOpenAdminPanel = () => {
    onOpenChange(false);
    setAdminPanelOpen(true);
  };

  if (!user) return null;

  return (
    <>
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
                My Account
              </Dialog.Title>

              <Dialog.Description className="mt-2 text-center text-sm text-muted-foreground">
                Your account information.
              </Dialog.Description>

              <div className="mt-8 space-y-5">
                <div className="flex items-center gap-4 rounded-lg border p-4">
                  <div className="rounded-full bg-muted p-3">
                    <User className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground">Full Name</p>
                    <p className="font-medium">{user.name}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-lg border p-4">
                  <div className="rounded-full bg-muted p-3">
                    <Mail className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground">Email</p>
                    <p className="font-medium">{user.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-lg border p-4">
                  <div className="rounded-full bg-muted p-3">
                    <Phone className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground">
                      Phone Number
                    </p>
                    <p className="font-medium">{user.phone}</p>
                  </div>
                </div>

                {user.role === "admin" && (
                  <Button className="w-full" onClick={handleOpenAdminPanel}>
                    Open Admin Panel
                  </Button>
                )}

                <Button
                  variant="destructive"
                  className="w-full"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
      <AdminPanelModal 
        open={adminPanelOpen} 
        onOpenChange={setAdminPanelOpen} 
      />
      <ProductModal
        open={productModalOpen}
        onOpenChange={setProductModalOpen}
      />
    </>
  );
}

export default UserModal;
