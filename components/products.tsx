'use client'

import Image, { type StaticImageData } from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { ShoppingCart } from 'lucide-react'

interface Product {
  id: number
  name: string
  category: string
  price: number
  discountedPrice: number
  images: string[]
  rating: number
}

// Helper to generate image paths dynamically
const getProductImages = (productIndex: number, totalImages: number) =>
  Array.from({ length: totalImages }).map(
    (_, i) => `/products/product${productIndex + 1}/image${i + 1}.jpg`
  )

// Sample product data — values differ, but images are generated dynamically
const products: Product[] = [
  {
    id: 1,
    name: 'White Oud',
    category: 'Premium Attar | 12ml',
    price: 2300,
    discountedPrice: 1730,
    images: getProductImages(0, 3),
    rating: 5,
  },
  {
    id: 2,
    name: 'Rose',
    category: 'Premium Attar | 15ml',
    price: 1500,
    discountedPrice: 1130,
    images: getProductImages(1, 3),
    rating: 4,
  },
  {
    id: 3,
    name: 'Aqua Di Gio',
    category: 'Luxury Attar | 12ml',
    price: 1700,
    discountedPrice: 1280,
    images: getProductImages(2, 3),
    rating: 5,
  },
  {
    id: 1,
    name: 'Hugo Boss',
    category: 'Premium Attar | 12ml',
    price: 2300,
    discountedPrice: 1730,
    images: getProductImages(3, 3),
    rating: 5,
  },
  {
    id: 2,
    name: 'Dela Sabaya',
    category: 'Premium Attar | 15ml',
    price: 1950,
    discountedPrice: 1450,
    images: getProductImages(4, 3),
    rating: 4,
  },
  {
    id: 3,
    name: 'Chocolate',
    category: 'Luxury Attar | 12ml',
    price: 2000,
    discountedPrice: 1500,
    images: getProductImages(5, 3),
    rating: 5,
  },
  {
    id: 1,
    name: 'Gucci Rush',
    category: 'Premium Attar | 12ml',
    price: 1700,
    discountedPrice: 1280,
    images: getProductImages(6, 3),
    rating: 5,
  },
  {
    id: 2,
    name: 'Mont Blanc Legend',
    category: 'Premium Attar | 15ml',
    price: 1750,
    discountedPrice: 1300,
    images: getProductImages(7, 3),
    rating: 4,
  },
  {
    id: 3,
    name: 'Royal Desire',
    category: 'Luxury Attar | 12ml',
    price: 1800,
    discountedPrice: 1380,
    images: getProductImages(8, 3),
    rating: 5,
  },
  {
    id: 3,
    name: 'Aseel',
    category: 'Luxury Attar | 12ml',
    price: 1750,
    discountedPrice: 1300,
    images: getProductImages(9, 3),
    rating: 5,
  },
]

export default function Products() {
  return (
    <section className="py-16 md:py-24 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-7xl text-amber-950 font-bold mb-4">
            Our Collection
          </h2>
          <p className="text-lg text-foreground/70 mb-8 font-bold">
            Explore our curated selection of premium fragrances
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, productIndex) => (
            <Card
              key={product.id}
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
              </div>

              {/* Content */}
              <CardContent className="p-4">
                <span className="text-xs font-semibold text-primary uppercase tracking-wide">
                  {product.category}
                </span>

                <h3 className="text-lg font-semibold text-foreground mt-2 mb-2">
                  {product.name}
                </h3>

                <div className="flex items-center gap-1 mb-3">
                  <div className="flex text-yellow-400">
                    {[...Array(product.rating)].map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <span className="font-bold text-amber-800">
                    <span className="text-xl">
                      Rs {product.discountedPrice.toLocaleString()}
                    </span>{' '}
                    <span className="line-through">
                      Rs {product.price.toLocaleString()}
                    </span>
                  </span>
                </div>

                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground flex items-center justify-center gap-2">
                  <ShoppingCart className="w-4 h-4" />
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}