import Link from 'next/link'
import { LayoutDashboard, CheckSquare, Flag } from 'lucide-react'

const adminLinks = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/approvals', label: 'Approvals', icon: CheckSquare },
  { href: '/admin/reports', label: 'Reports', icon: Flag },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-56 border-r bg-muted/30 flex-shrink-0">
        <div className="p-4 border-b">
          <p className="font-bold text-sm">Admin Panel</p>
        </div>
        <nav className="p-2">
          {adminLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-2 px-3 py-2 rounded-md text-sm hover:bg-muted transition-colors"
            >
              <link.icon className="h-4 w-4" />
              {link.label}
            </Link>
          ))}
        </nav>
      </aside>
      {/* Content */}
      <main className="flex-1 p-6 overflow-auto">{children}</main>
    </div>
  )
}
