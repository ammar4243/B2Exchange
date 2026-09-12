import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'
import { WalletProvider } from '@/components/wallet-provider'

export const metadata: Metadata = {
  title: 'Exchange B2 Exchange — Multi-chain trading',
  description: 'Trade, build liquidity, and launch tokens across multiple blockchains.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#f7f8f4',
  userScalable: true,
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className="bg-background"><body className="antialiased"><WalletProvider>{children}</WalletProvider>{process.env.NODE_ENV === 'production' && <Analytics />}</body></html>
}
