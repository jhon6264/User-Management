import './globals.css'
import type { Metadata } from 'next/types'

export const metadata: Metadata = {
  title: 'User Management System',
  description: 'Space-themed user management system',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen overflow-x-hidden bg-gray-900">
        {/* Star Background */}
        <div className="stars-container"></div>
        {children}
      </body>
    </html>
  )
}