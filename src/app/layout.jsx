import './globals.css'
import './ds.css'

import Navbar from '@/components/Navbar'
import Footer from '@/components/layout/Footer'
import { Archivo, Inter_Tight, Inter } from 'next/font/google'

const archivo = Archivo({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
  weight: ['700', '800', '900']
})

const interTight = Inter_Tight({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-heading',
  weight: ['700']
})

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
  weight: ['400', '500']
})

export const metadata = {
  title: 'Auxosys',
  description: 'Auxosys helps startups, businesses, and enterprises transform ambitious ideas into secure, scalable, and intelligent digital products.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={`${archivo.variable} ${interTight.variable} ${inter.variable}`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
