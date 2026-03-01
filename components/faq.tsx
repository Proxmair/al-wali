'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

interface FAQItem {
  id: number
  question: string
  answer: string
}

const faqs: FAQItem[] = [
  {
    id: 1,
    question: 'Are all fragrances 100% original?',
    answer: 'Yes, all our fragrances are sourced directly from authorized distributors and manufacturers. We guarantee 100% authenticity on every product. Each item comes with proper packaging and batch information.',
  },
  {
    id: 2,
    question: 'What is your return policy?',
    answer: 'We offer a hassle-free 7-day return policy. If you\'re not satisfied with your purchase for any reason, you can return it within 7 days of delivery. The product should be in its original, unopened condition.',
  },
  {
    id: 3,
    question: 'Do you offer free shipping?',
    answer: 'Yes! We provide completely free shipping on all orders across India, regardless of the order value. Orders are typically delivered within 3-5 business days.',
  },
  {
    id: 4,
    question: 'How do I track my order?',
    answer: 'Once your order is shipped, you\'ll receive a tracking number via email. You can use this number to track your package in real-time on our website or the courier partner\'s platform.',
  },
  {
    id: 5,
    question: 'Can I use multiple discount codes?',
    answer: 'No, only one coupon code can be applied per order. However, our exclusive deals section offers amazing discounts that may stack with seasonal promotions.',
  },
  {
    id: 6,
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards, debit cards, UPI, net banking, and digital wallets. All transactions are encrypted and secured with advanced SSL technology.',
  },
]

export default function FAQ() {
  const [openId, setOpenId] = useState<number | null>(null)

  return (
    <section className="py-16 md:py-24 px-4 bg-background">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-foreground/70">
            Find answers to common questions about our products and services
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className="border border-border rounded-lg overflow-hidden hover:border-primary transition-colors"
            >
              <button
                onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                className="w-full px-6 py-4 flex items-center justify-between bg-background hover:bg-muted/50 transition-colors"
              >
                <span className="text-lg font-semibold text-foreground text-left">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-primary flex-shrink-0 transition-transform duration-300 ${
                    openId === faq.id ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Answer */}
              {openId === faq.id && (
                <div className="px-6 py-4 bg-muted/30 border-t border-border">
                  <p className="text-foreground/80 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-12 p-8 bg-muted/50 rounded-lg text-center border border-border">
          <p className="text-foreground mb-4">
            Didn&apos;t find your answer?
          </p>
          <a
            href="mailto:support@alwali.com"
            className="inline-block px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
          >
            Contact Our Support Team
          </a>
        </div>
      </div>
    </section>
  )
}
