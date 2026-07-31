import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import ReduxProvider from '@/store/provider'
const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });
import WhatsAppButton from '@/components/WhatsAppButton'
export const metadata: Metadata = {
  title: 'AL Wali - Premium Perfumes | Andaz Apka Mehak Humari',
  description: 'Discover exquisite fragrances at AL Wali. Premium quality perfumes with special deals and authentic products.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <ReduxProvider>
          {children}
          <WhatsAppButton />
        </ReduxProvider>
      </body>
    </html>
  )
}
