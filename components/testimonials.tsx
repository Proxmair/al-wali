'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Testimonial {
  id: number
  name: string
  role: string
  image: string
  rating: number
  text: string
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Priya Sharma',
    role: 'Fragrance Enthusiast',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    rating: 5,
    text: 'AL Wali offers the finest fragrances I\'ve ever experienced. The quality is exceptional and the deals are unbeatable!',
  },
  {
    id: 2,
    name: 'Arjun Patel',
    role: 'Regular Customer',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    rating: 5,
    text: 'Fast delivery, authentic products, and amazing customer service. Highly recommended for anyone who loves perfumes.',
  },
  {
    id: 3,
    name: 'Neha Verma',
    role: 'Beauty & Lifestyle Blogger',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
    rating: 5,
    text: 'The variety of fragrances and the premium quality make AL Wali my go-to destination. Their customer care is exceptional.',
  },
  {
    id: 4,
    name: 'Rohit Singh',
    role: 'Professional',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    rating: 5,
    text: 'I\'ve been ordering from AL Wali for 2 years now. Never disappointed with quality or service. Keep it up!',
  },
]

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
  const [autoPlay, setAutoPlay] = useState(true)

  useEffect(() => {
    if (!autoPlay) return

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [autoPlay])

  const next = () => {
    setCurrent((prev) => (prev + 1) % testimonials.length)
    setAutoPlay(false)
  }

  const prev = () => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    setAutoPlay(false)
  }

  const testimonial = testimonials[current]

  return (
    <section className="py-16 md:py-24 px-4 bg-muted/50">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-foreground/70">
            Real testimonials from our beloved customers
          </p>
        </div>

        {/* Testimonial Slider */}
        <div className="bg-background rounded-lg p-8 md:p-12 border border-border shadow-lg">
          <div className="text-center">
            {/* Rating */}
            <div className="flex justify-center gap-1 mb-4">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>

            {/* Quote */}
            <p className="text-xl md:text-2xl text-foreground font-serif italic mb-6 text-balance">
              "{testimonial.text}"
            </p>

            {/* Customer Info */}
            <div className="flex flex-col items-center gap-4">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-primary"
              />
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  {testimonial.name}
                </h3>
                <p className="text-sm text-foreground/70">
                  {testimonial.role}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <Button
              variant="outline"
              size="sm"
              onClick={prev}
              className="rounded-full p-2"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrent(index)
                    setAutoPlay(false)
                  }}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === current ? 'bg-primary w-6' : 'bg-muted-foreground'
                  }`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={next}
              className="rounded-full p-2"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
