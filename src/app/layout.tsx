import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import './globals.css'

export const metadata: Metadata = {
  title:
    'Proactive － A real-time speech recognised to-do list enabled with AI',
  description:
    'get proactive by adding to-do tasks declaratively using Speech Recognition plus AI.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={GeistSans.className}>{children}</body>
    </html>
  )
}
