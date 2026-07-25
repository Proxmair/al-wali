"use client";

import { useEffect, useState } from "react";
import { Loader2, Pencil, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import ProductModal from "../ProductModal";

interface Product {
  _id: string;
  name: string;
  category: string;
  price: number;
  discountedPrice: number;
  rating: number;
  createdAt: string;
}

const ProductsTab = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [selectedProduct , setSelectedProduct] = useState<Product>();

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const response = await fetch("/api/products");
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch products.");
      }

      setProducts(data.products);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setOpenModal(true)
  }

  return (
    <>
      <ProductModal
        selectedProduct={selectedProduct}
        open={openModal}
        onOpenChange={(open) => {
          setOpenModal(open);

          // Refresh when modal closes
          if (!open) {
            fetchProducts();
          }
        }}
      />

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">Products</h2>
            <p className="text-sm text-muted-foreground">
              Manage your product catalog.
            </p>
          </div>

          <Button onClick={() => setOpenModal(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </div>

        <div className="overflow-hidden rounded-xl border">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium">
                    Name
                  </th>

                  <th className="px-4 py-3 text-left text-sm font-medium">
                    Category
                  </th>

                  <th className="px-4 py-3 text-left text-sm font-medium">
                    Price
                  </th>

                  <th className="px-4 py-3 text-left text-sm font-medium">
                    Discount Price
                  </th>

                  <th className="px-4 py-3 text-left text-sm font-medium">
                    Rating
                  </th>

                  <th className="px-4 py-3 text-center text-sm font-medium">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="py-10 text-center"
                    >
                      <div className="flex items-center justify-center gap-2 text-muted-foreground">
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Loading products...
                      </div>
                    </td>
                  </tr>
                ) : products.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="py-10 text-center text-muted-foreground"
                    >
                      No products found.
                    </td>
                  </tr>
                ) : (
                  products.map((product) => (
                    <tr
                      key={product._id}
                      className="border-t hover:bg-muted/30"
                    >
                      <td className="px-4 py-3 font-medium">
                        {product.name}
                      </td>

                      <td className="px-4 py-3">
                        {product.category}
                      </td>

                      <td className="px-4 py-3">
                        ${product.price}
                      </td>

                      <td className="px-4 py-3">
                        ${product.discountedPrice}
                      </td>

                      <td className="px-4 py-3">
                        {product.rating}
                      </td>

                      <td className="px-4 py-3">
                        <div className="flex justify-center">
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => handleEditProduct(product)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductsTab;