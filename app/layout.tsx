import type { Metadata } from 'next'
import './globals.css'
import './artwork.css'

export const metadata: Metadata = { title: 'Shivaji — Selected Works', description: 'A collection of work, play and moving pictures.' }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>
}
