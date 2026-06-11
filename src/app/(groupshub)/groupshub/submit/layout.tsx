import type { Metadata } from 'next'
import { buildSubmitMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = buildSubmitMetadata()

export default function SubmitLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
