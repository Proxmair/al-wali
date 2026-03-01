'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tag } from 'lucide-react'

interface Deal {
  id: number
  title: string
  description: string
  discount: string
  color: string
}

const deals: Deal[] = [
  {
    id: 1,
    title: 'Ramzan Specials',
    description: 'Get three premium attar at the price of two.',
    discount: 'Exclusive Offer',
    color: 'from-primary to-primary/80',
  },
  {
    id: 2,
    title: 'Couple Deal',
    description: 'Two fragrances, A perfect bond.',
    discount: 'Exclusive Offer',
    color: 'from-accent to-accent/80',
  },
  {
    id: 3,
    title: 'Fragrance Discovery Offer',
    description: 'Buy  one attar get a free sample attar.',
    discount: 'Exclusive Offer',
    color: 'from-secondary to-secondary/80',
  },
]

export default function Deals() {
  return (
    <section className="py-16 md:py-24 px-4 bg-background mb-550 xl:mb-140">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-7xl text-amber-950 font-bold mb-4">
            Exclusive Deals
          </h2>
          <p className="text-lg text-foreground/70 font-bold">
            Limited time offers on our finest fragrances
          </p>
        </div>

        <div className="absolute left-0 w-screen grid grid-cols-1 xl:grid-cols-3 gap-0.5 xl:h-160 h-550">
          {deals.map((deal, index) => (
            <Card
              key={deal.id}
              className={`relative overflow-hidden rounded-none border-0 shadow-lg hover:shadow-xl transition-shadow bg-[url("/deal${index + 1}.jpg")] bg-center bg-cover bg-no-repeat`}
            >
              {/* Badge */}
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur text-foreground px-4 py-2 rounded-full flex items-center gap-2">
                <Tag className="w-4 h-4" />
                <span className="font-bold text-sm">{deal.discount}</span>
              </div>

              {/* Content */}
              <div className="p-8 h-full flex flex-col justify-between">
                <div className="bg-black/50 text-white p-4 rounded-lg w-fit">
                  <h3 className="text-4xl mb-4 text-balance">
                    {deal.title}
                  </h3>
                  <p className="text-base leading-relaxed opacity-90">
                    {deal.description}
                  </p>
                </div>

                <Button
                  className="mt-6 w-full bg-white text-foreground hover:bg-white/90 font-semibold"
                >
                  Shop Now
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
