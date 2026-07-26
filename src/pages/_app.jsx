import '@/styles/globals.css'
import '@/styles/ds.css'
import '@/styles/home-pro.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/layout/Footer'
import Head from 'next/head'
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

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Auxosys</title>
        <meta name="description" content="Auxosys helps startups, businesses, and enterprises transform ambitious ideas into secure, scalable, and intelligent digital products." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className={`${archivo.variable} ${interTight.variable} ${inter.variable}`} data-scroll-behavior="smooth">
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </div>
    </>
  )
}
