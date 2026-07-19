"use client";

import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import * as Tabs from "@radix-ui/react-tabs";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";
import  LoginForm  from "./login-form";
import  SignupForm  from "./signup-form";

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultTab?: "login" | "signup";
}

export function AuthModal({
  open,
  onOpenChange,
  defaultTab = "login",
}: AuthModalProps) {
  const [tab, setTab] = React.useState(defaultTab);

  React.useEffect(() => {
    if (open) {
      setTab(defaultTab);
    }
  }, [defaultTab, open]);

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
              {tab === "login" ? "Welcome Back" : "Create Account"}
            </Dialog.Title>

            <Dialog.Description className="mt-2 text-center text-sm text-muted-foreground">
              {tab === "login"
                ? "Login to continue."
                : "Create your account to get started."}
            </Dialog.Description>

            <Tabs.Root
              value={tab}
              onValueChange={(value) =>
                setTab(value as "login" | "signup")
              }
              className="mt-6"
            >
              <Tabs.List className="grid h-11 w-full grid-cols-2 rounded-lg bg-muted p-1">
                <Tabs.Trigger
                  value="login"
                  className={cn(
                    "rounded-md text-sm font-medium transition-all",
                    "data-[state=active]:bg-background",
                    "data-[state=active]:shadow-sm"
                  )}
                >
                  Login
                </Tabs.Trigger>

                <Tabs.Trigger
                  value="signup"
                  className={cn(
                    "rounded-md text-sm font-medium transition-all",
                    "data-[state=active]:bg-background",
                    "data-[state=active]:shadow-sm"
                  )}
                >
                  Sign Up
                </Tabs.Trigger>
              </Tabs.List>

              <Tabs.Content value="login" className="mt-6">
                <LoginForm onOpenChange={onOpenChange} />
              </Tabs.Content>

              <Tabs.Content value="signup" className="mt-6">
                <SignupForm onOpenChange={onOpenChange} />
              </Tabs.Content>
            </Tabs.Root>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}