'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Heart, ShoppingCart } from 'lucide-react'
import Image from 'next/image'

interface Product {
  id: number
  name: string
  category: string
  price: number
  image: string
  rating: number
  reviews: number
}

const allProducts: Product[] = [
  {
    id: 1,
    name: 'Oud Royal',
    category: 'Premium',
    price: 4999,
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500&h=600&fit=crop',
    rating: 4.8,
    reviews: 342,
  },
  {
    id: 2,
    name: 'Rose Essence',
    category: 'Floral',
    price: 2999,
    image: 'https://images.unsplash.com/photo-1564654309505-4a9cc0b27f38?w=500&h=600&fit=crop',
    rating: 4.6,
    reviews: 218,
  },
  {
    id: 3,
    name: 'Amber Nights',
    category: 'Woody',
    price: 3499,
    image: 'https://images.unsplash.com/photo-1575883306e88c9c8f0c22b2f2f2f0a?w=500&h=600&fit=crop',
    rating: 4.7,
    reviews: 156,
  },
  {
    id: 4,
    name: 'Fresh Citrus',
    category: 'Fresh',
    price: 2499,
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&h=600&fit=crop',
    rating: 4.5,
    reviews: 289,
  },
  {
    id: 5,
    name: 'Midnight Bliss',
    category: 'Oriental',
    price: 3999,
    image: 'https://images.unsplash.com/photo-1618405032710-dae8ee0fdc01?w=500&h=600&fit=crop',
    rating: 4.9,
    reviews: 401,
  },
  {
    id: 6,
    name: 'Ocean Breeze',
    category: 'Fresh',
    price: 2799,
    image: 'https://images.unsplash.com/photo-1593642632823-8f0d414cd108?w=500&h=600&fit=crop',
    rating: 4.4,
    reviews: 167,
  },
  {
    id: 7,
    name: 'Spice Trails',
    category: 'Woody',
    price: 3299,
    image: 'https://images.unsplash.com/photo-1612528443702-f6741f3a6f1f?w=500&h=600&fit=crop',
    rating: 4.7,
    reviews: 234,
  },
  {
    id: 8,
    name: 'Lavender Dream',
    category: 'Floral',
    price: 2599,
    image: 'https://images.unsplash.com/photo-1623252149847-2dd719c2c89e?w=500&h=600&fit=crop',
    rating: 4.6,
    reviews: 198,
  },
]

const categories = ['All', 'Premium', 'Floral', 'Woody', 'Fresh', 'Oriental']

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState('All')

  const filteredProducts = selectedCategory === 'All'
    ? allProducts
    : allProducts.filter(p => p.category === selectedCategory)

  return (
    <section className="py-16 md:py-24 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
            Our Collection
          </h2>
          <p className="text-lg text-foreground/70 mb-8">
            Explore our curated selection of premium fragrances
          </p>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2 rounded-full font-medium transition-all text-sm ${
                  selectedCategory === category
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-foreground hover:bg-muted/80'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Card
              key={product.id}
              className="overflow-hidden hover:shadow-lg transition-shadow border border-border"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden bg-muted group">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={300}
                  height={400}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-white/90 transition-colors">
                  <Heart className="w-5 h-5 text-foreground" />
                </button>
              </div>

              {/* Content */}
              <div className="p-4">
                <span className="text-xs font-semibold text-primary uppercase tracking-wide">
                  {product.category}
                </span>
                <h3 className="text-lg font-semibold text-foreground mt-2 mb-2">
                  {product.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-3">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground ml-2">
                    ({product.reviews})
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-end gap-2 mb-4">
                  <span className="text-2xl font-bold text-foreground">
                    ₹{product.price.toLocaleString()}
                  </span>
                </div>

                {/* Add to Cart Button */}
                <Button
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Add to Cart
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
