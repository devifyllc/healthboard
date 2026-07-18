import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Healthboard - Application Health Dashboard',
  description: 'Multi-environment application health dashboard'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* eslint-disable-next-line @next/next/no-page-custom-font -- rule predates the App Router; root layout is the correct place for a global font link */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&family=JetBrains+Mono:wght@400;700&family=Material+Symbols+Outlined:wght,FILL@300..700,0..1&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
