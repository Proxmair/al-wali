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
    answer: 'Yes! We provide completely free shipping on all orders across Karachi, regardless of the order value. Orders are typically delivered within 3-5 business days.',
  },
  {
    id: 4,
    question: 'How should I apply Attar?',
    answer: 'The most effective way to apply attar is to gently roll it directly onto the skin, focusing on your pulse points.These areas—such as the wrists, the nape of the neck, and behind the ears—help the fragrance develop and last longer.',
  },
  {
    id: 5,
    question: 'Are your attars Alcohol free?',
    answer: 'Al-Wali attars are alcohol free.The perfumes contain alcohol',
  },
  {
    id: 6,
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards, debit cards, cash on delivery. All transactions are encrypted and secured with advanced SSL technology.',
  },
]


export default function FAQ() {
  const [openId, setOpenId] = useState<number | null>(null)

  return (
    <section id='faq' className="py-16 md:py-24 px-4 bg-background">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-7xl text-amber-950 font-bold mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-foreground/70 mb-8 font-bold">
            Find answers to common questions about our products and services
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs?.map((faq) => (
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
      </div>
    </section>
  )
}
