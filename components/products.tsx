"use client";

import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

export interface Product {
  _id: string;
  name: string;
  category: string;
  price: number;
  discountedPrice: number;
  images: string[];
  rating: number;
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products", {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await res.json();

        // If your API returns { products: [...] }
        setProducts(data.products ?? data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section
      id="collection"
      className="py-16 md:py-24 px-4 bg-background"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-7xl text-amber-950 font-bold mb-4">
            Our Collection
          </h2>

          <p className="text-lg text-foreground/70 mb-8 font-bold">
            Explore our curated selection of premium attars
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">Loading products...</div>
        ) : products.length === 0 ? (
          <div className="text-center py-12">No products found.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}