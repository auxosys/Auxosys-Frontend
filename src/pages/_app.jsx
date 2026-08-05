import '@/styles/globals.css'
import '@/styles/ds.css'
import '@/styles/home-pro.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/layout/Footer'
import CookieBanner from '@/components/CookieBanner'
import Head from 'next/head'
import { Archivo, Inter_Tight, Inter } from 'next/font/google'

const archivo = Archivo({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
  weight: ['400', '500', '600', '700', '800', '900']
})

const interTight = Inter_Tight({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-heading',
  weight: ['300', '400', '500', '600', '700']
})

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
  weight: ['400', '500']
})

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Auxosys</title>
        <meta name="description" content="Auxosys helps startups, businesses, and enterprises transform ambitious ideas into secure, scalable, and intelligent digital products." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Open Graph / Facebook / WhatsApp */}
        <meta property="og:site_name" content="Auxosys" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://auxosys.vercel.app/" />
        <meta property="og:title" content="Auxosys | Secure & Scalable Digital Products" />
        <meta property="og:description" content="Auxosys helps startups, businesses, and enterprises transform ambitious ideas into secure, scalable, and intelligent digital products." />
        <meta property="og:image" content="https://auxosys.vercel.app/images/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        
        {/* Schema.org for strict parsers */}
        <meta itemProp="name" content="Auxosys | Secure & Scalable Digital Products" />
        <meta itemProp="description" content="Auxosys helps startups, businesses, and enterprises transform ambitious ideas into secure, scalable, and intelligent digital products." />
        <meta itemProp="image" content="https://auxosys.vercel.app/images/og-image.jpg" />
        
        {/* Twitter / Telegram */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://auxosys.vercel.app/" />
        <meta property="twitter:title" content="Auxosys | Secure & Scalable Digital Products" />
        <meta property="twitter:description" content="Auxosys helps startups, businesses, and enterprises transform ambitious ideas into secure, scalable, and intelligent digital products." />
        <meta property="twitter:image" content="https://auxosys.vercel.app/images/og-image.jpg" />
      </Head>
      <div className={`${archivo.variable} ${interTight.variable} ${inter.variable}`} data-scroll-behavior="smooth">
        <Navbar />
        <Component {...pageProps} />
        <CookieBanner />
        <Footer />
      </div>
    </>
  )
}
