'use client'

import { usePathname } from 'next/navigation'
import { NavbarHome } from './NavbarHome'
import { NavbarGroupsHub } from './NavbarGroupsHub'

export function NavbarSwitcher() {
  const pathname = usePathname()
  if (pathname.startsWith('/admin')) return null
  if (pathname.startsWith('/groupshub')) return <NavbarGroupsHub />
  return <NavbarHome />
}
