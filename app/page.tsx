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
import { getHomeDeals, getHomeMisc, getHomeProducts } from '@/lib/home-data'

export const revalidate = 300

export default async function Home() {
  const [products, deals, misc] = await Promise.all([getHomeProducts(), getHomeDeals(), getHomeMisc()])
  return (
    <main className="min-h-screen bg-background">
      <TopNavbar />
      <Navbar />
      <Hero misc={misc} />
      <Deals deals={deals} />
      <Products products={products} />
      <Features />
      <Testimonials />
      <ContactUs/>
      <FAQ />
      <Footer />
    </main>
  )
}
