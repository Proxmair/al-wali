'use client'

import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin } from 'lucide-react'
import Image from 'next/image'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-secondary text-white">
      {/* Main Footer */}
      <div className="px-4 py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div className="space-y-4">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/icon-color-dark-mode-eKyFPIZV6zDeAdsYJiCcIRFxQSJp6O.png"
                alt="AL Wali"
                width={40}
                height={40}
                className="h-12 w-auto"
              />
              <p className="text-white/80 text-sm leading-relaxed">
                Discover the essence of luxury with AL Wali&apos;s premium fragrance collection. Authentic, elegant, and unforgettable.
              </p>
              {/* Social Links */}
              <div className="flex gap-4 pt-4">
                <a href="#" className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-white/80 hover:text-white transition-colors text-sm">
                    Shop All
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white/80 hover:text-white transition-colors text-sm">
                    New Arrivals
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white/80 hover:text-white transition-colors text-sm">
                    Best Sellers
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white/80 hover:text-white transition-colors text-sm">
                    Gift Sets
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white/80 hover:text-white transition-colors text-sm">
                    Bundle Deals
                  </a>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-white/80 hover:text-white transition-colors text-sm">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white/80 hover:text-white transition-colors text-sm">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white/80 hover:text-white transition-colors text-sm">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white/80 hover:text-white transition-colors text-sm">
                    Careers
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <div className="space-y-3">
                <div className="flex gap-3 items-start">
                  <Phone className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <a href="tel:+919876543210" className="text-white/80 hover:text-white transition-colors text-sm">
                    +91 98765 43210
                  </a>
                </div>
                <div className="flex gap-3 items-start">
                  <Mail className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <a href="mailto:support@alwali.com" className="text-white/80 hover:text-white transition-colors text-sm">
                    support@alwali.com
                  </a>
                </div>
                <div className="flex gap-3 items-start">
                  <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <p className="text-white/80 text-sm">
                    Mumbai, India
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-white/10 pt-8"></div>

          {/* Bottom Footer */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-white/70">
            <p>
              &copy; {currentYear} AL Wali. All rights reserved. | Andak Apka Mehak Humari
            </p>
            <div className="flex gap-4 md:justify-end">
              <a href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Terms & Conditions
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Shipping Info
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
