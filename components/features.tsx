'use client'

import { Truck, Shield, Lock, RefreshCw } from 'lucide-react'

interface Feature {
  icon: React.ReactNode
  title: string
  description: string
}

const features: Feature[] = [
  {
    icon: <Truck className="w-8 h-8" />,
    title: 'Free Delivery',
    description: 'Complimentary shipping on all orders across the country',
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: '100% Original',
    description: 'Authentic fragrances directly sourced from manufacturers',
  },
  {
    icon: <Lock className="w-8 h-8" />,
    title: 'Secure Payment',
    description: 'Safe and encrypted transactions for your peace of mind',
  },
  {
    icon: <RefreshCw className="w-8 h-8" />,
    title: 'Free Returns',
    description: '7-day hassle-free return policy on all products',
  },
]

export default function Features() {
  return (
    <section className="py-16 md:py-24 px-4 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-7xl text-amber-950 font-bold mb-4">
            Why Choose AL Wali
          </h2>
          <p className="text-lg font-bold text-foreground/70">
            Experience luxury with confidence and assurance
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-lg bg-background border border-border hover:border-primary transition-colors"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-foreground/70 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
