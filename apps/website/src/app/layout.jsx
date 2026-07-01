import './globals.css'

import Navbar from '@/components/Navbar'

export const metadata = {
  title: 'Auxosys',
  description: 'Auxosys helps startups, businesses, and enterprises transform ambitious ideas into secure, scalable, and intelligent digital products.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
