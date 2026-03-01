'use client'

import Navbar from '@/components/navbar'
import Hero from '@/components/hero'
import Deals from '@/components/deals'
import Features from '@/components/features'
import Products from '@/components/products'
import Testimonials from '@/components/testimonials'
import FAQ from '@/components/faq'
import Footer from '@/components/footer'
import TopNavbar from '@/components/top-navbar'

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <TopNavbar />
      <Navbar />
      <Hero />
      <Deals />
      <Features />
      <Products />
      <Testimonials />
      <FAQ />
      <Footer />
    </main>
  )
}
