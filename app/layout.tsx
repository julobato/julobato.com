import type { Metadata, Viewport } from 'next'
import { DM_Sans } from 'next/font/google'
import { LangProvider } from '@/components/LangProvider'
import { SiteAnalytics } from '@/components/SiteAnalytics'
import './globals.css'

// To try another Google font, swap DM_Sans here (e.g. Inter, Manrope, Figtree).
const sans = DM_Sans({ subsets: ['latin', 'latin-ext'], variable: '--font-sans', display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL('https://julobato.com'),
  title: { default: 'Julianne Lobato · Backend and Full-Stack Software Engineer', template: '%s · Julianne Lobato' },
  description:
    'Software engineer in Lisbon with 6+ years building backend systems and full-stack apps: integrations, data pipelines, and the automation in between.',
  openGraph: { siteName: 'Julianne Lobato', type: 'website' },
  twitter: { card: 'summary_large_image' }
}

export const viewport: Viewport = {
  themeColor: '#fdb500'
}

// Runs before first paint so the saved or system theme applies without a flash.
const themeScript = `try{document.documentElement.dataset.theme=localStorage.getItem('theme')??(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light')}catch(e){}`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={sans.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <LangProvider>{children}</LangProvider>
        <SiteAnalytics />
      </body>
    </html>
  )
}
