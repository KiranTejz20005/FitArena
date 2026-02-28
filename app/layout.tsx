import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Providers } from './providers'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'FitArena - Stake & Earn Rewards',
  description: 'A minimalistic fitness tracking platform where you can stake tokens, complete challenges, and earn rewards.',
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

const themeScript = `
  (function() {
    try {
      const theme = localStorage.getItem('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const isDark = theme === 'dark' || (!theme && prefersDark);
      
      if (isDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch (e) {}
  })()
`

import { Navbar } from '@/components/layout/navbar'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${_geist.className} ${_geistMono.className} font-sans antialiased bg-background text-foreground selection:bg-fuchsia-500/30`} suppressHydrationWarning>
        <Providers>
          <div className="relative min-h-screen min-w-0 overflow-x-hidden">
            {/* Ambient Background Gradients */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
              <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-fuchsia-500/10 blur-[120px] rounded-full" />
              <div className="absolute top-[20%] -right-[10%] w-[30%] h-[50%] bg-purple-600/10 blur-[120px] rounded-full" />
              <div className="absolute -bottom-[10%] left-[20%] w-[50%] h-[30%] bg-emerald-500/5 blur-[120px] rounded-full" />
            </div>
            <Navbar />
            {children}
          </div>
        </Providers>
      </body>
    </html>
  )
}
