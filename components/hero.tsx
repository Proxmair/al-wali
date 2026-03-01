'use client'

import { Button } from '@/components/ui/button'

export default function Hero() {
  return (
    <section className="relative h-screen md:h-96 overflow-hidden bg-gradient-to-r from-secondary via-secondary to-secondary/90 flex items-center justify-center">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -mr-48 -mt-48" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -ml-48 -mb-48" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-3xl">
        <h1 className="text-4xl md:text-6xl text-foreground mb-4 text-balance">
          Andak Apka Mehak Humari
        </h1>
        <p className="text-lg md:text-xl text-foreground/80 mb-8 text-balance">
          Discover the essence of luxury with AL Wali&apos;s premium fragrance collection
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
          >
            Shop Now
          </Button>
          <Button 
            size="lg"
            variant="outline"
            className="border-2 border-foreground text-foreground hover:bg-foreground hover:text-background font-semibold"
          >
            Sign In
          </Button>
        </div>
      </div>
    </section>
  )
}
