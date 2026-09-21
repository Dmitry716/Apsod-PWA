'use client'

import Link from 'next/link'
import type { ComponentProps } from 'react'
import { withLocale } from '@/app/lib/locale-path'
import { useLocale } from '@/app/lib/useLocale'

type Props = Omit<ComponentProps<typeof Link>, 'href'> & {
  href: string
  /** Force a locale; defaults to the active UI locale */
  locale?: 'ru' | 'en'
}

/** next/link that preserves `/en` prefix for the active language */
export default function LocaleLink({ href, locale: localeProp, ...rest }: Props) {
  const { locale } = useLocale()
  const resolved = withLocale(localeProp ?? locale, href)
  return <Link href={resolved} {...rest} />
}
