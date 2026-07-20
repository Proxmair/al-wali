'use client'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { Star } from 'lucide-react'

interface Testimonial {
  id: number
  name: string
  role: string
  rating: number
  text: string
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Abdurehman',
    role: 'Customer',
    rating: 5,
    text: 'Bohat zabardast fragrance hai. Maine White Oud liya tha, poora din khushboo rehti hai. Packaging bhi bohat premium hai. Higly recommeded!!',
  },
  {
    id: 2,
    name: 'Usama Ali',
    role: 'Customer',
    rating: 5,
    text: 'Honestly expected nahi tha itni achi quality hogi. Rose attar bohat zabardast aur soft smell hai.',
  },
  {
    id: 3,
    name: 'Hassan Khan',
    role: 'Customer',
    rating: 5,
    text: 'Maine tester deal li thi aur mujhe idea ho gaya kounsa fragrance best hai. Bohat achi deal hai.',
  },
  {
    id: 4,
    name: 'Saad',
    role: 'Customer',
    rating: 4,
    text: 'Packaging ka to jawab nahi, maza aa gaya. Attar ki quality bohat achi hai.',
  },
  {
    id: 5,
    name: 'Anusha',
    role: 'Customer',
    rating: 4,
    text: 'First time try kiya tha lekin honestly impressed ho gai.',
  },
];

export default function Testimonials() {
  return (
    <section id='testimonials' className="py-16 md:py-24 bg-muted/50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-7xl text-amber-950 font-bold mb-4">
            From Our Customers
          </h2>
          <p className="text-lg text-foreground/70 mb-8 font-bold">
            Hear what our customers have to say about our fragrances.
          </p>
        </div>

        <Carousel className="w-full">
          <CarouselContent className="space-x-4">
            {testimonials.map((t) => (
              <CarouselItem
                key={t.id}
                className="flex-1 w-full sm:min-w-[600px] min-w-[300px] bg-white p-6 rounded-lg shadow-md text-center"
              >
                {/* Rating */}
                <div className="flex justify-center gap-1 mb-2">
                  {[...Array(t.rating)]?.map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-yellow-400"
                    />
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-sm md:text-base text-foreground/90 mb-4">
                  {t.text}
                </p>

                {/* Customer Name & Role */}
                <div>
                  <h3 className="font-semibold text-foreground">{t.name}</h3>
                  <p className="text-xs text-foreground/70">{t.role}</p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {testimonials.length > 1 && (
            <>
              <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md" />
              <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md" />
            </>
          )}
        </Carousel>
      </div>
    </section>
  )
}