'use client'

import { useState } from 'react'
import { Share2, Check } from 'lucide-react'
import { toast } from 'sonner'

interface ShareButtonProps {
  groupName: string
  slug: string
}

export function ShareButton({ groupName, slug }: ShareButtonProps) {
  const [copied, setCopied] = useState(false)

  const shareUrl = `${typeof window !== 'undefined' ? window.location.origin : 'https://groupshub.com'}/groups/${slug}`

  const handleShare = async () => {
    // Use native share sheet on mobile if available
    if (navigator.share) {
      try {
        await navigator.share({
          title: groupName,
          text: `Join "${groupName}" — find and join this group on GroupsHub`,
          url: shareUrl,
        })
        return
      } catch {
        // User cancelled or not supported — fall through to clipboard
      }
    }

    // Fallback: copy to clipboard
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      toast.success('Link copied! Share it with anyone.')
      setTimeout(() => setCopied(false), 2500)
    } catch {
      toast.error('Could not copy link.')
    }
  }

  return (
    <button
      onClick={handleShare}
      className="inline-flex items-center gap-2 px-4 py-3 rounded-lg border border-border bg-background hover:bg-muted text-sm font-semibold transition-colors"
    >
      {copied ? (
        <>
          <Check className="h-4 w-4 text-green-500" />
          <span className="text-green-600 dark:text-green-400">Copied!</span>
        </>
      ) : (
        <>
          <Share2 className="h-4 w-4" />
          Share
        </>
      )}
    </button>
  )
}
