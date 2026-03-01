'use client'

import { Button } from '@/components/ui/button'

export default function Hero() {
  return (
    <section className='relative h-250 overflow-hidden bg-[url("/slider-1.jpeg")] bg-cover bg-no-repeat bg-center flex items-center justify-center'>
      {/* Content */}
      <div className="relative z-10 xl:left-[20vw] bottom-57.5 flex flex-col justify-center xl:items-start px-4 max-w-3xl ">
        <h1 className=" text-4xl xs:text-5xl sm:text-6xl xl:text-8xl font-bold text-orange-900 mb-4 text-balance text-center xl:text-start">
          Andaz Apka Mehak Hamari
        </h1>
        <p className="text-md xl:text-lg text-foreground/80 mb-8 text-balance font-bold text-center xl:text-start">
          Discover the essence of luxury with AL Wali&apos;s premium fragrance collection
        </p>
        <p className="text-md xl:text-lg text-white mb-8 text-balance bg-amber-900 p-3 xl:p-4 mx-auto rounded-2xl">
          Ramazan Special offer Buy 3 in pay of 2
        </p>

        <div className="w-40 flex sm:flex-row gap-4 justify-center mx-auto">
          <Button
            size={'default'}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
          >
            Shop Now
          </Button>
          <Button 
            size={'default'}
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
