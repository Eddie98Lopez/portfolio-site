import type { Metadata, Viewport } from 'next'

import { cn } from '@/utilities/ui'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import React from 'react'

import { AdminBar } from '@/components/AdminBar'
import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode } from 'next/headers'
import { getSocialLinks } from '@/utilities/socialToRecord'

import './globals.css'
import { getServerSideURL } from '@/utilities/getURL'

/* ------------------------------------------------------------------ */
/* Site config — edit these in one place                              */
/* ------------------------------------------------------------------ */
const SITE = {
  name: 'Eddie Lopez',
  title: 'Eddie Lopez — Design Engineer',
  description:
    'Eddie Lopez is a design engineer building thoughtful interfaces, design systems, and polished web experiences.',
  url: getServerSideURL(),
  ogImage: '/og-image.webp',
  locale: 'en_US',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()
  const socialLinks = await getSocialLinks()

  const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: SITE.name,
    jobTitle: 'Design Engineer',
    url: SITE.url,
    image: `${SITE.url}${SITE.ogImage}`,
    sameAs: Object.values(socialLinks),
  }

  return (
    <html className={cn(GeistSans.variable, GeistMono.variable)} lang="en" suppressHydrationWarning>
      <head>
        <InitTheme />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className="texture" data-pattern="dot">
        <Providers>
          <AdminBar
            adminBarProps={{
              preview: isEnabled,
            }}
          />

          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.title,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  publisher: SITE.name,
  keywords: [
    'Eddie Lopez',
    'design engineer',
    'UI engineer',
    'frontend developer',
    'design systems',
    'interaction design',
    'portfolio',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: mergeOpenGraph({
    type: 'website',
    url: SITE.url,
    siteName: SITE.name,
    title: SITE.title,
    description: SITE.description,
    locale: SITE.locale,
  }),
  // No X account, but this card type still controls how links preview on X,
  // Slack, Discord, iMessage, etc. Creator/site handles are intentionally omitted.
  twitter: {
    card: 'summary_large_image',
    title: SITE.title,
    description: SITE.description,
    images: [SITE.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-touch-icon.png',
  },
  category: 'technology',
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
}
