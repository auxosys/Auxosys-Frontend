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
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#17262B" />
        
        {/* Web Manifest & Favicons */}
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        
        {/* Preconnects */}

        
        {/* Search Console Verification (Enabled via env in production) */}
        {process.env.NEXT_PUBLIC_GSC_VERIFICATION && (
          <meta name="google-site-verification" content={process.env.NEXT_PUBLIC_GSC_VERIFICATION} />
        )}

        {/* Global Fallback Title (Pages will override this) */}
        <title>Auxosys | Intelligent Digital Products & Enterprise Solutions</title>
        <meta name="description" content="Auxosys helps startups, businesses, and enterprises transform ambitious ideas into secure, scalable, and intelligent digital products." />
        
        {/* Global Organization JSON-LD Base */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Auxosys",
              "alternateName": "Auxosys AI",
              "description": "Auxosys is a technology company building innovative digital products, SaaS platforms, and AI-powered solutions.",
              "url": process.env.NEXT_PUBLIC_SITE_URL || "https://www.auxosys.com",
              "logo": `${process.env.NEXT_PUBLIC_SITE_URL || "https://www.auxosys.com"}/apple-touch-icon.png`,
              "sameAs": [
                "https://github.com/auxosys"
              ]
            })
          }}
        />
      </Head>
      <div className={`${archivo.variable} ${interTight.variable} ${inter.variable}`} data-scroll-behavior="smooth">
        <Navbar />
        <main>
          <Component {...pageProps} />
        </main>
        <CookieBanner />
        <Footer />
      </div>
    </>
  )
}
