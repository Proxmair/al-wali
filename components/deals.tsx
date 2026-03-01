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
    title: 'Buy 3, Pay for 2',
    description: 'Get three premium perfumes at the price of two. Perfect for collectors!',
    discount: '33% OFF',
    color: 'from-primary to-primary/80',
  },
  {
    id: 2,
    title: '30% Off Combo',
    description: 'Buy any two fragrances and enjoy 30% discount on your entire purchase.',
    discount: '30% OFF',
    color: 'from-accent to-accent/80',
  },
  {
    id: 3,
    title: 'Mini Size Gift',
    description: 'Purchase any perfume and get a complimentary 3ml mini perfume as a gift.',
    discount: 'FREE GIFT',
    color: 'from-secondary to-secondary/80',
  },
]

export default function Deals() {
  return (
    <section className="py-16 md:py-24 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
            Exclusive Deals
          </h2>
          <p className="text-lg text-foreground/70">
            Limited time offers on our finest fragrances
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {deals.map((deal) => (
            <Card
              key={deal.id}
              className={`relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br ${deal.color}`}
            >
              {/* Badge */}
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur text-foreground px-4 py-2 rounded-full flex items-center gap-2">
                <Tag className="w-4 h-4" />
                <span className="font-bold text-sm">{deal.discount}</span>
              </div>

              {/* Content */}
              <div className="p-8 text-white h-full flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-serif font-bold mb-4 text-balance">
                    {deal.title}
                  </h3>
                  <p className="text-base leading-relaxed opacity-90">
                    {deal.description}
                  </p>
                </div>

                <Button
                  className="mt-6 w-full bg-white text-foreground hover:bg-white/90 font-semibold"
                >
                  Shop This Deal
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
