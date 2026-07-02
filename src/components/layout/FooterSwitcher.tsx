'use client'

import { usePathname } from 'next/navigation'
import { FooterHome } from './FooterHome'
import { Footer } from './Footer'

export function FooterSwitcher() {
  const pathname = usePathname()
  if (pathname.startsWith('/admin')) return null
  if (pathname.startsWith('/groupshub')) return <Footer />
  return <FooterHome />
}
