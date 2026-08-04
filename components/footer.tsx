'use client'

import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin, Youtube } from 'lucide-react'
import Image from 'next/image'
import Logo from '@/public/main-logo.png'
import { scrollToSection } from '@/lib/utils'
import TikTok from '@/public/tiktok.png'
import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">

        {/* Row 1 - Brand */}
        <div className="flex flex-col items-start gap-6 mb-12">
          <Image
            onClick={() => scrollToSection('hero')}
            src={Logo}
            alt="AL Wali"
            className="w-[600px] h-auto mx-auto"
          />


        </div>

        {/* Row 2 - Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Quick Links */}
          <div className="flex flex-col gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-5">Quick Links</h3>
              <ul className="space-y-3 text-sm text-white/80">
                <li><a onClick={() => scrollToSection('deals')} className="hover:text-white hover:cursor-pointer">Exclusive Deals</a></li>
                <li><a onClick={() => scrollToSection('why-us')} className="hover:text-white hover:cursor-pointer">Why Choose AL Wali</a></li>
                <li><a onClick={() => scrollToSection('collection')} className="hover:text-white hover:cursor-pointer">Our Collection</a></li>
                <li><a onClick={() => scrollToSection('testimonials')} className="hover:text-white hover:cursor-pointer">From Our Customers</a></li>
                <li><a onClick={() => scrollToSection('faq')} className="hover:text-white hover:cursor-pointer">Frequently Asked Questions</a></li>
              </ul>
            </div>

            <div className="flex gap-4 items-center pt-2">
              <a href="https://www.facebook.com/share/1EABFv2a2S/" className="p-2 hover:bg-white/10 rounded-lg transition">
                <Facebook size={18} />
              </a>
              <a href="https://www.youtube.com/@alwali.store3" className="p-2 hover:bg-white/10 rounded-lg transition">
                <Youtube size={18} />
              </a>
              <a href="https://www.instagram.com/alwali.store3?igsh=MTRmNnhwczdjM2plNg==" className="p-2 hover:bg-white/10 rounded-lg transition">
                <Instagram size={18} />
              </a>

              <a href='https://www.tiktok.com/@alwali.store3?_r=1&_t=ZS-94ihggzB7iM'>

                <Image
                  src={TikTok}
                  alt="TikTok"
                  width={34}
                  height={34}
                  className="p-2 hover:bg-white/10 rounded-lg transition"
                />
              </a>
              {/* <Image ={TikTok} className="p-2 hover:bg-white/10 rounded-lg transition">
                
              </image> */}
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-5">Company</h3>
            <ul className="space-y-3 text-sm text-white/80">
              <li><a onClick={() => scrollToSection('contact')} className="hover:text-white hover:cursor-pointer">Contact Us</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-5">Contact Us</h3>
            <div className="space-y-4 text-sm text-white/80">

              <div className="flex items-center gap-3">
                <Phone size={18} />
                <a href="tel:+919876543210" className="hover:text-white">
                  +92 3350004779
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Mail size={18} />
                <a href="mailto:support@alwali.com" className="hover:text-white">
                  alwali.store3@gmail.com
                </a>
              </div>

              <div className="flex items-start gap-3">
                <MapPin size={18} />
                <p className='hover:cursor-pointer'>R799 , sector 15A4 , Bufferzone , Karachi , Sindh , Pakistan</p>
              </div>

            </div>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-white/10 my-10"></div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/70">
          <p>© {new Date().getFullYear()} AL Wali. All rights reserved. | Andaz Apka Mehak Humari</p>

          <div className="flex gap-6">
            <Link href="/privacy-policy" className="hover:text-white">Privacy Policy</Link>
            <Link href="/terms-and-conditions" className="hover:text-white">Terms & Conditions</Link>
            <Link href="/shipping-info" className="hover:text-white">Shipping Info</Link>
          </div>
        </div>

      </div>
    </footer>
  )
}