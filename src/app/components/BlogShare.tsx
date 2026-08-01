'use client'

import { useState } from 'react'

type Props = {
  url: string
  title: string
  locale?: 'ru' | 'en'
}

export default function BlogShare({ url, title, locale = 'ru' }: Props) {
  const [copied, setCopied] = useState(false)
  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)
  const label = locale === 'en' ? 'Share' : 'Поделиться'
  const copiedLabel = locale === 'en' ? 'Link copied' : 'Ссылка скопирована'

  const links = [
    {
      name: 'Telegram',
      href: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
    },
    {
      name: 'WhatsApp',
      href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    },
    {
      name: 'Facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
    {
      name: 'LinkedIn',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
    {
      name: 'X',
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    },
  ] as const

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="border-t border-slate-200 dark:border-slate-800 pt-8">
      <p className="text-sm font-medium tracking-[0.14em] uppercase text-slate-500 dark:text-slate-400 mb-4">
        {label}
      </p>
      <div className="flex flex-wrap gap-2">
        {links.map((link) => (
          <a
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700 hover:border-slate-900 dark:hover:border-white transition-colors"
          >
            {link.name}
          </a>
        ))}
        <button
          type="button"
          onClick={copyLink}
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700 hover:border-slate-900 dark:hover:border-white transition-colors"
        >
          {copied ? copiedLabel : locale === 'en' ? 'Copy link' : 'Копировать ссылку'}
        </button>
      </div>
    </div>
  )
}
