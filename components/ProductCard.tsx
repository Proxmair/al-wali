import Image, { type StaticImageData } from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { LoaderCircle, ShoppingBag, ShoppingCart, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { toggleCart, toggleFavourite } from "@/store/slices/counterSlice";
import { useState } from "react";
import BuyNowModal from "./modals/BuyNowModal";

export interface Product {
  _id: string;
  name: string;
  category: string;
  price: number;
  discountedPrice: number;
  images: string[];
  rating: number;
  dealHeading?: string;
}

const ProductCard = ({ product }: { product: Product }) => {
  const dispatch = useDispatch();
  const favouriteIds = useSelector(
    (state: RootState) => state.counter.favourite.ids
  );
  const addedToCardIds = useSelector(
    (state: RootState) => state.counter.cart.ids
  );
  const isFavourite = favouriteIds.includes(product._id);
  const isAddedtoCart = addedToCardIds.includes(product._id);

  const user = useSelector((state: RootState) => state.user.user);
  const isAdmin = user?.role === "admin";

  const [isDeleting, setIsDeleting] = useState(false);
  const [isBuyNowModalOpen, setIsBuyNowModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string>("");

  const handleFavouriteClick = () => {
    dispatch(toggleFavourite(product._id));
  };

  const handleAddtoCartClick = () => {
    window.fbq("track", "AddToCart");
    dispatch(toggleCart(product._id));
  };

  const handleBuyNowClick = (product:Product) => {
    if(product._id) {
      setIsBuyNowModalOpen(true);
      setSelectedProductId(product._id);
    }
  }

  const handleDelete = async () => {
    try {
      setIsDeleting(true);

      const res = await fetch("/api/products", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: product._id,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to delete product.");
      }

      // Refresh the page so the product disappears
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("Failed to delete product.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
    <Card
      id={`product-${product._id}`}
      key={`product-${product._id}`}
      className="overflow-hidden hover:shadow-lg p-0 transition-shadow border border-border"
    >
      {/* Image Carousel */}
      <div className="relative">
        <Carousel className="w-full">
          <CarouselContent>
            {product.images.map((img, index) => (
              <CarouselItem key={index}>
                <div className="relative h-64 w-full">
                  <Image
                    src={img}
                    alt={`${product.name}-${index}`}
                    fill
                    className="object-cover"
                    priority={index === 0}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {product.images.length > 1 && (
            <>
              <CarouselPrevious className="left-2" />
              <CarouselNext className="right-2" />
            </>
          )}
        </Carousel>

        <button className="absolute top-3 right-3 z-10 p-2 bg-primary text-xs text-white rounded-full shadow-md hover:bg-amber-400 transition-colors">
          25% OFF
        </button>
        {isAdmin && (
            <button onClick={handleDelete} className="absolute top-3 right-20 z-10 p-2 bg-primary text-xs text-white rounded-full shadow-md hover:bg-amber-400 transition-colors">
           
           {isDeleting ? <LoaderCircle className="w-3 h-3" /> : <Trash2 className="w-3 h-3" />}
        </button>
        )}
        
      </div>

      {/* Content */}
      <CardContent className="p-4">
        <div className="flex justify-between">
          <span className="text-xs font-semibold text-primary uppercase tracking-wide">
            {product.category}
          </span>
        </div>

        <h3 className="text-lg font-semibold text-foreground mt-2 mb-2">
          {product.name}
        </h3>

        <div className="flex items-center gap-1 mb-3">
          <div className="flex text-yellow-400">
            {[...Array(product?.rating)]?.map((_, i) => (
              <span key={i}>★</span>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <span className="font-bold text-amber-800">
            <span className="text-xl">
              Rs {product.discountedPrice.toLocaleString()}
            </span>{" "}
            <span className="line-through">
              Rs {product.price.toLocaleString()}
            </span>
          </span>
        </div>

            <div className="w-full flex flex-col gap-2">
        <Button
          onClick={() => handleBuyNowClick(product)}
          className="w-full bg-secondary hover:bg-secondary/90 text-primary-foreground flex items-center justify-center gap-2"
        >
          <ShoppingBag className="w-4 h-4" />
          Buy Now
        </Button>

        <Button
          onClick={handleAddtoCartClick}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground flex items-center justify-center gap-2"
        >
          <ShoppingCart className="w-4 h-4" />
          {isAddedtoCart ? "Remove from Cart" : "Add to Cart"}
        </Button>
            </div>
      </CardContent>
    </Card>
    <BuyNowModal selectedProductId={selectedProductId} open={isBuyNowModalOpen} onOpenChange={setIsBuyNowModalOpen} />
    </>
  );
};

export default ProductCard;
