import './globals.css'

export const metadata = {
  title: 'Auxosys',
  description: 'Auxosys helps startups, businesses, and enterprises transform ambitious ideas into secure, scalable, and intelligent digital products.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
