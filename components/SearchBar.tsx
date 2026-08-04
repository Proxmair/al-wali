"use client";

import { scrollToSection } from "@/lib/utils";
import { Search, Loader2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

interface Product {
  _id: string;
  name: string;
  category: string;
  price: number;
  discountedPrice: number;
  images: string[];
}

const SearchBar = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const res = await fetch("/api/products", {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await res.json();

        setProducts(data.products ?? data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (!search.trim()) {
      setFilteredProducts([]);
      return;
    }

    const result = products.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredProducts(result.slice(0, 8));
  }, [search, products]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={wrapperRef} className="hidden lg:block flex-1 mx-8 relative">
      <div className="flex items-center bg-muted rounded-full px-4 py-2 gap-2">
        <Search className="w-4 h-4 text-muted-foreground" />

        <input
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder="Search attars"
          className="bg-transparent outline-none w-full text-sm placeholder-muted-foreground"
        />

        {loading && (
          <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
        )}
      </div>

      {open && search.trim() && (
        <div className="absolute left-0 right-0 mt-2 bg-background border rounded-xl shadow-lg overflow-hidden z-50 max-h-96 overflow-y-auto">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <button
                key={product._id}
                type="button"
                onClick={() => {
                  scrollToSection(`product-${product._id}`);
                  setOpen(false);
                  setSearch("");
                }}
                className="w-full flex items-center gap-3 p-3 hover:bg-muted transition-colors border-b last:border-b-0 text-left"
              >
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-12 h-12 rounded-lg object-cover"
                />

                <div className="flex-1">
                  <p className="font-medium">{product.name}</p>

                  <p className="text-sm text-muted-foreground">
                    Rs {product.discountedPrice.toLocaleString()}
                  </p>
                </div>
              </button>
            ))
          ) : (
            <div className="p-4 text-center text-sm text-muted-foreground">
              No products found.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
