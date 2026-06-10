'use client'

import { useState } from 'react'
import { ExternalLink } from 'lucide-react'
import { toast } from 'sonner'

interface JoinButtonProps {
  groupSlug: string
  inviteLink: string
  platform: string
}

export function JoinButton({ groupSlug, inviteLink, platform }: JoinButtonProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleJoin = async () => {
    // Check sessionStorage dedup
    const joinedGroups = JSON.parse(sessionStorage.getItem('joined_groups') || '[]')
    if (joinedGroups.includes(groupSlug)) {
      window.open(inviteLink, '_blank', 'noopener,noreferrer')
      return
    }

    setIsLoading(true)
    try {
      await fetch(`/api/groups/${groupSlug}/join`, { method: 'POST' })
      // Mark as joined in session
      joinedGroups.push(groupSlug)
      sessionStorage.setItem('joined_groups', JSON.stringify(joinedGroups))
      toast.success('Opening group link...')
      window.open(inviteLink, '_blank', 'noopener,noreferrer')
    } catch {
      // Still open the link even if counter fails
      window.open(inviteLink, '_blank', 'noopener,noreferrer')
    } finally {
      setIsLoading(false)
    }
  }

  const platformLabels: Record<string, string> = {
    whatsapp: 'Join WhatsApp Group',
    telegram: 'Join Telegram Group',
    discord: 'Join Discord Server',
  }

  const platformColors: Record<string, string> = {
    whatsapp: '#25D366',
    telegram: '#2AABEE',
    discord: '#5865F2',
  }

  return (
    <button
      onClick={handleJoin}
      disabled={isLoading}
      className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-white font-semibold text-sm transition-opacity hover:opacity-90 disabled:opacity-70"
      style={{ backgroundColor: platformColors[platform] || '#6366f1' }}
    >
      <ExternalLink className="h-4 w-4" />
      {isLoading ? 'Opening...' : platformLabels[platform] || 'Join Group'}
    </button>
  )
}
