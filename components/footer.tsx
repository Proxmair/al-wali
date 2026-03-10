'use client'

import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin } from 'lucide-react'
import Image from 'next/image'
import Logo from '@/public/main-logo.png'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">

        {/* Row 1 - Brand */}
        <div className="flex flex-col items-start gap-6 mb-12">
          <Image
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
      <li><a href="#" className="hover:text-white">Shop All</a></li>
      <li><a href="#" className="hover:text-white">New Arrivals</a></li>
      <li><a href="#" className="hover:text-white">Best Sellers</a></li>
      <li><a href="#" className="hover:text-white">Gift Sets</a></li>
      <li><a href="#" className="hover:text-white">Bundle Deals</a></li>
    </ul>
  </div>

  <div className="flex gap-4 items-center pt-2">
    <a href="#" className="p-2 hover:bg-white/10 rounded-lg transition">
      <Facebook size={18} />
    </a>
    <a href="#" className="p-2 hover:bg-white/10 rounded-lg transition">
      <Instagram size={18} />
    </a>
    <a href="#" className="p-2 hover:bg-white/10 rounded-lg transition">
      <Twitter size={18} />
    </a>
    <a href="#" className="p-2 hover:bg-white/10 rounded-lg transition">
      <Linkedin size={18} />
    </a>
  </div>
</div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-5">Company</h3>
            <ul className="space-y-3 text-sm text-white/80">
              <li><a href="#" className="hover:text-white">Contact Us</a></li>
              <li><a href="#" className="hover:text-white">Blog</a></li>
              <li><a href="#" className="hover:text-white">Careers</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-5">Contact Us</h3>
            <div className="space-y-4 text-sm text-white/80">

              <div className="flex items-center gap-3">
                <Phone size={18} />
                <a href="tel:+919876543210" className="hover:text-white">
                  +91 98765 43210
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Mail size={18} />
                <a href="mailto:support@alwali.com" className="hover:text-white">
                  support@alwali.com
                </a>
              </div>

              <div className="flex items-start gap-3">
                <MapPin size={18} />
                <p>Mumbai, India</p>
              </div>

            </div>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-white/10 my-10"></div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/70">
          <p>© {new Date().getFullYear()} AL Wali. All rights reserved. | Andak Apka Mehak Humari</p>

          <div className="flex gap-6">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms & Conditions</a>
            <a href="#" className="hover:text-white">Shipping Info</a>
          </div>
        </div>

      </div>
    </footer>
  )
}