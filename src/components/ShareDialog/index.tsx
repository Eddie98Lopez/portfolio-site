'use client'

import * as React from 'react'
import { Check, Facebook, Link2, Linkedin, Mail, Twitter, X, Share2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { cn } from '@/lib/utils'

type ShareDialogProps = {
  /** URL to share. Defaults to the current page URL on the client. */
  url?: string
  /** Title used for email subject / tweet text. */
  title?: string
  /** Optional custom trigger. Defaults to a "Share" button. */
  trigger?: React.ReactNode
  /** Controlled open state (optional). */
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function ShareDialog({ url, title = '', trigger, open, onOpenChange }: ShareDialogProps) {
  const [shareUrl, setShareUrl] = React.useState(url ?? '')
  const [copied, setCopied] = React.useState(false)

  // Fall back to the current page URL once mounted (avoids SSR mismatch).
  React.useEffect(() => {
    if (!url && typeof window !== 'undefined') setShareUrl(window.location.href)
  }, [url])

  React.useEffect(() => {
    if (!copied) return
    const t = setTimeout(() => setCopied(false), 2000)
    return () => clearTimeout(t)
  }, [copied])

  const encodedUrl = encodeURIComponent(shareUrl)
  const encodedTitle = encodeURIComponent(title)

  const links = [
    {
      name: 'Facebook',
      icon: Facebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
    {
      name: 'Email',
      icon: Mail,
      href: `mailto:?subject=${encodedTitle}&body=${encodedUrl}`,
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
    {
      name: 'X',
      icon: Twitter,
      href: `https://x.com/intent/post?url=${encodedUrl}&text=${encodedTitle}`,
    },
  ]

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
    } catch (err) {
      console.error('Failed to copy link:', err)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        {trigger ?? (
          <Button variant="outline">
            <Share2 />
          </Button>
        )}
      </DialogTrigger>

      {/* [&>button:last-child]:hidden hides shadcn's built-in close button
          so we can render our own in the header. */}
      <DialogContent className="sm:max-w-md [&>button:last-child]:hidden">
        <DialogHeader className="flex flex-row items-center justify-between space-y-0">
          <DialogTitle>Share</DialogTitle>
          <DialogClose asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" aria-label="Close">
              <X className="h-4 w-4" />
            </Button>
          </DialogClose>
        </DialogHeader>
        <DialogDescription className="sr-only">Share this page</DialogDescription>

        <ul className="flex flex-row items-start justify-between gap-2">
          {links.map(({ name, icon: Icon, href }) => (
            <li key={name} className="flex-1">
              <a
                href={href}
                target={name === 'Email' ? undefined : '_blank'}
                rel="noopener noreferrer"
                aria-label={`Share on ${name}`}
                className={cn(
                  'group flex flex-col items-center gap-2 rounded-md p-2 text-sm text-muted-foreground',
                  'transition-colors hover:text-foreground',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                )}
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full border bg-background transition-colors group-hover:bg-accent">
                  <Icon className="h-5 w-5" />
                </span>
                {name}
              </a>
            </li>
          ))}
        </ul>

        <Button
          onClick={handleCopy}
          className="w-full py-6"
          aria-live="polite"
          variant={'outline'}
          size={'lg'}
        >
          {copied ? <Check className="mr-2 h-4 w-4" /> : <Link2 className="mr-2 h-4 w-4" />}
          {copied ? 'Link copied' : 'Copy link'}
        </Button>
      </DialogContent>
    </Dialog>
  )
}

export default ShareDialog
