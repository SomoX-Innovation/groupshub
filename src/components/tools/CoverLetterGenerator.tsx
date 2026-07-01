'use client'

import { useState, useEffect, useCallback } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { TONES, LENGTHS } from '@/lib/validations/cover-letter.schema'
import { COVER_LETTER_PRICING, type CoverLetterTier } from '@/lib/dodo/client'

type LengthKey = keyof typeof LENGTHS

const textareaClass =
  'w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-y'

const inputClass =
  'w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'

function wordCount(text: string): number {
  const trimmed = text.trim()
  return trimmed ? trimmed.split(/\s+/).length : 0
}

function formatPrice(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`
}

type OrderStatus = 'pending' | 'paid' | 'used' | 'failed'

function PricingTiers({ onSelect, checkingOut }: { onSelect: (tier: CoverLetterTier) => void; checkingOut: CoverLetterTier | null }) {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {(Object.keys(COVER_LETTER_PRICING) as CoverLetterTier[]).map((tier) => {
        const plan = COVER_LETTER_PRICING[tier]
        return (
          <div key={tier} className="rounded-2xl border border-border p-5 flex flex-col">
            <div className="font-semibold">{plan.label}</div>
            <div className="text-xs text-muted-foreground mb-3">{plan.words}</div>
            <div className="text-2xl font-bold mb-4">{formatPrice(plan.amountCents)}</div>
            <Button
              className="mt-auto w-full"
              disabled={checkingOut !== null}
              onClick={() => onSelect(tier)}
            >
              {checkingOut === tier ? 'Redirecting…' : 'Buy & generate'}
            </Button>
          </div>
        )
      })}
    </div>
  )
}

export function CoverLetterGenerator() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const orderIdFromUrl = searchParams.get('order_id')

  const [checkingOut, setCheckingOut] = useState<CoverLetterTier | null>(null)
  const [checkoutError, setCheckoutError] = useState('')

  const [order, setOrder] = useState<{ id: string; tier: LengthKey; status: OrderStatus } | null>(null)
  const [orderLoading, setOrderLoading] = useState(!!orderIdFromUrl)
  const [orderError, setOrderError] = useState('')

  const [resume, setResume] = useState('')
  const [jobDescription, setJobDescription] = useState('')
  const [company, setCompany] = useState('')
  const [tone, setTone] = useState<(typeof TONES)[number]>(TONES[0])
  const [specificPoints, setSpecificPoints] = useState('')

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [letter, setLetter] = useState('')
  const [copied, setCopied] = useState(false)

  const pollOrder = useCallback(async (orderId: string) => {
    try {
      const res = await fetch(`/api/orders/${orderId}`)
      const data = await res.json()
      if (!res.ok) {
        setOrderError(typeof data?.error === 'string' ? data.error : 'Could not verify your order.')
        setOrderLoading(false)
        return
      }
      setOrder(data.order)
      if (data.order.status === 'paid') {
        setOrderLoading(false)
      } else if (data.order.status === 'pending') {
        setTimeout(() => pollOrder(orderId), 2000)
      } else {
        setOrderLoading(false)
      }
    } catch {
      setOrderError('Could not reach the server to verify your order.')
      setOrderLoading(false)
    }
  }, [])

  useEffect(() => {
    if (orderIdFromUrl) {
      setOrderLoading(true)
      pollOrder(orderIdFromUrl)
    }
  }, [orderIdFromUrl, pollOrder])

  const handleSelectTier = async (tier: CoverLetterTier) => {
    setCheckoutError('')
    setCheckingOut(tier)
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tier }),
      })
      const data = await res.json()
      if (!res.ok || !data.checkoutUrl) {
        setCheckoutError(typeof data?.error === 'string' ? data.error : 'Could not start checkout. Please try again.')
        setCheckingOut(null)
        return
      }
      window.location.href = data.checkoutUrl
    } catch {
      setCheckoutError('Could not reach the server. Please try again.')
      setCheckingOut(null)
    }
  }

  const canSubmit = resume.trim().length > 0 && jobDescription.trim().length > 0 && !loading

  const handleGenerate = async () => {
    if (!order || order.status !== 'paid') return
    setLoading(true)
    setError('')
    setLetter('')

    try {
      const res = await fetch('/api/generate-cover-letter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resume,
          jobDescription,
          company,
          tone,
          specificPoints,
          length: order.tier,
          orderId: order.id,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        const message =
          typeof data?.error === 'string'
            ? data.error
            : 'Something went wrong generating your cover letter. Please try again.'
        setError(message)
        return
      }

      setLetter(data.letter || '')
      setOrder({ ...order, status: 'used' })
    } catch {
      setError('Could not reach the server. Check your connection and try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = async () => {
    if (!letter) return
    await navigator.clipboard.writeText(letter)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = () => {
    if (!letter) return
    const blob = new Blob([letter], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `cover-letter${company ? `-${company.trim().toLowerCase().replace(/\s+/g, '-')}` : ''}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  // No order yet — show pricing to start checkout.
  if (!orderIdFromUrl) {
    return (
      <div className="space-y-4">
        <PricingTiers onSelect={handleSelectTier} checkingOut={checkingOut} />
        {checkoutError && (
          <div className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {checkoutError}
          </div>
        )}
      </div>
    )
  }

  // Returned from checkout — waiting for the webhook to confirm payment.
  if (orderLoading) {
    return <div className="text-sm text-muted-foreground py-8 text-center">Confirming your payment…</div>
  }

  if (orderError || !order) {
    return (
      <div className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
        {orderError || 'Order not found.'}
      </div>
    )
  }

  if (order.status === 'failed') {
    return (
      <div className="space-y-4">
        <div className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          Payment was not completed. Please choose a plan to try again.
        </div>
        <Button onClick={() => router.push('/cover-letter-generator')}>Back to plans</Button>
      </div>
    )
  }

  if (order.status === 'used' && !letter) {
    return (
      <div className="space-y-4">
        <div className="rounded-md border border-border px-3 py-2 text-sm text-muted-foreground">
          This purchase has already been used to generate a cover letter.
        </div>
        <Button onClick={() => router.push('/cover-letter-generator')}>Buy another cover letter</Button>
      </div>
    )
  }

  // order.status === 'paid' (or 'used' with a freshly generated letter in this session) — show the form.
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-4">
        <div className="rounded-md border border-primary/30 bg-primary/5 px-3 py-2 text-sm">
          Paid: <strong>{LENGTHS[order.tier].label}</strong>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium">Resume / background</label>
          <textarea
            className={textareaClass}
            rows={8}
            maxLength={6000}
            placeholder="Paste your resume, work history, or a summary of your background..."
            value={resume}
            onChange={(e) => setResume(e.target.value)}
          />
          <div className="text-xs text-muted-foreground text-right">{resume.length}/6000</div>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium">Job description</label>
          <textarea
            className={textareaClass}
            rows={8}
            maxLength={6000}
            placeholder="Paste the job posting you're applying to..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
          />
          <div className="text-xs text-muted-foreground text-right">{jobDescription.length}/6000</div>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium">Target company (optional)</label>
          <input
            className={inputClass}
            maxLength={200}
            placeholder="e.g. Acme Corp"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium">Tone</label>
          <Select value={tone} onValueChange={(v) => setTone(v as (typeof TONES)[number])}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {TONES.map((t) => (
                <SelectItem key={t} value={t} className="capitalize">
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium">Specific points to include (optional)</label>
          <textarea
            className={textareaClass}
            rows={3}
            maxLength={2000}
            placeholder="Anything specific you want mentioned — a project, a referral, a certification..."
            value={specificPoints}
            onChange={(e) => setSpecificPoints(e.target.value)}
          />
        </div>

        <Button onClick={handleGenerate} disabled={!canSubmit || order.status === 'used'} className="w-full">
          {loading ? 'Generating…' : order.status === 'used' ? 'Already generated' : 'Generate cover letter'}
        </Button>

        {error && (
          <div className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {error}
          </div>
        )}
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">Your cover letter</label>
          {letter && (
            <span className="text-xs text-muted-foreground">{wordCount(letter)} words</span>
          )}
        </div>

        <div className="min-h-[24rem] rounded-md border border-input bg-background p-4 text-sm whitespace-pre-wrap leading-relaxed">
          {letter || (
            <span className="text-muted-foreground">
              {loading ? 'Writing your cover letter…' : 'Your generated cover letter will appear here.'}
            </span>
          )}
        </div>

        {letter && (
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleCopy}>
              {copied ? 'Copied!' : 'Copy to clipboard'}
            </Button>
            <Button variant="outline" size="sm" onClick={handleDownload}>
              Download as .txt
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
