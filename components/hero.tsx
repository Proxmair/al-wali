"use client";

import { Button } from "@/components/ui/button";
import { scrollToSection } from "@/lib/utils";
import { RootState } from "@/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AuthModal } from "./modals/AuthModal";

export default function Hero() {
  const isLoggedIn = useSelector(
    (state: RootState) => state.user.isLoggedIn
  );

  const [isOpen, setIsOpen] = useState(false);

  const [misc, setMisc] = useState({
    bannerText: "",
    bannerDesktopImage: "",
    bannerMobileImage: "",
  });

  const handleAuthModalOpen = () => {
    if (!isLoggedIn) {
      setIsOpen(true);
    }
  };

  useEffect(() => {
    const fetchMisc = async () => {
      try {
        const response = await fetch("/api/misc");

        const result = await response.json();

        if (result.success) {
          setMisc(result.misc);
        }
      } catch (error) {
        console.error(
          "Failed to fetch misc:",
          error
        );
      }
    };

    fetchMisc();
  }, []);


  return (
    <section
      id="hero"
      className="relative h-250 overflow-hidden 
      bg-cover bg-no-repeat bg-center flex items-center justify-center"
      style={{
        backgroundImage: `url(${
          typeof window !== "undefined" &&
          window.innerWidth < 640
            ? misc.bannerMobileImage
            : misc.bannerDesktopImage
        })`,
      }}
    >
      {/* Content */}
      <div className="relative z-10 xl:left-[20vw] bottom-57.5 flex flex-col justify-center xl:items-start px-4 max-w-3xl">
        <h1 className="text-4xl xs:text-5xl sm:text-6xl xl:text-8xl font-bold text-orange-900 mb-4 text-balance text-center xl:text-start">
          Andaz Apka Mehak Hamari
        </h1>

        <p className="text-md xl:text-lg text-foreground/80 mb-8 text-balance font-bold text-center xl:text-start">
          Discover the essence of luxury with AL Wali&apos;s premium attars collection
        </p>

        {misc.bannerText.trim().length > 0 && <p className="text-md xl:text-lg text-white mb-8 text-balance bg-amber-900 p-3 xl:p-4 mx-auto rounded-2xl">
          {misc.bannerText}
        </p>}

        <div className="w-40 flex sm:flex-row gap-4 justify-center mx-auto">
          <Button
            size={"default"}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
            onClick={() => {
              scrollToSection("collection");
            }}
          >
            Shop Now
          </Button>

          {!isLoggedIn && (
            <Button
              size={"default"}
              variant="outline"
              onClick={handleAuthModalOpen}
              className="border-2 border-foreground text-foreground hover:bg-foreground hover:text-background font-semibold"
            >
              Sign In
            </Button>
          )}
        </div>
      </div>

      <AuthModal
        open={isOpen}
        onOpenChange={setIsOpen}
        defaultTab="login"
      />
    </section>
  );
}