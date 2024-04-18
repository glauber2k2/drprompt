import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'DrPrompt',
  description: 'Prompts na palma da mão.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ptBR">
      <link rel="icon" href="/logo.png" />
      <body className={cn(inter.className, 'h-screen')}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
