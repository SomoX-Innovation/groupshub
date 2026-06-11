'use client'

import { usePathname } from 'next/navigation'
import { NavbarHome } from './NavbarHome'
import { NavbarGroupsHub } from './NavbarGroupsHub'

export function NavbarSwitcher() {
  const pathname = usePathname()
  if (pathname === '/') return <NavbarHome />
  if (pathname.startsWith('/admin')) return null
  return <NavbarGroupsHub />
}
