import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Shivaji — Selected Works',
  description: 'A broadsheet portfolio of work, play and moving pictures.',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>
}
