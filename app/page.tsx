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
import ContactUs from '@/components/contact-us'
import Counter from '@/components/ui/counter'
export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <TopNavbar />
      <Navbar />
      <Hero />
      <Deals />
      <Products />
      <Features />
      <Testimonials />
      <ContactUs/>
      <FAQ />
      <Footer />
    </main>
  )
}
