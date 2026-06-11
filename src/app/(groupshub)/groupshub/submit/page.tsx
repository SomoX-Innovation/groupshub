'use client'

import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { submitGroupSchema, type SubmitGroupInput } from '@/lib/validations/group.schema'
import { PLATFORMS, LANGUAGES } from '@/lib/constants'
import type { Category, Country } from '@/types/group'
import { CheckCircle, Plus, Globe2, MessageCircle, Hash, X } from 'lucide-react'
import Link from 'next/link'

const platformIcons: Record<string, { icon: React.ReactNode; color: string; bg: string }> = {
  whatsapp: { icon: <MessageCircle className="h-4 w-4" />, color: 'text-[#25D366]', bg: 'bg-[#25D366]/10 border-[#25D366]/30' },
  telegram: { icon: <Globe2 className="h-4 w-4" />, color: 'text-[#2AABEE]', bg: 'bg-[#2AABEE]/10 border-[#2AABEE]/30' },
  discord:  { icon: <Hash className="h-4 w-4" />,    color: 'text-[#5865F2]', bg: 'bg-[#5865F2]/10 border-[#5865F2]/30' },
}

export default function SubmitPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [countries, setCountries] = useState<Country[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState('')

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<SubmitGroupInput>({
    resolver: zodResolver(submitGroupSchema),
    defaultValues: { language_code: 'en' },
  })

  useEffect(() => {
    Promise.all([
      fetch('/api/categories').then((r) => r.json()),
      fetch('/api/countries').then((r) => r.json()),
    ]).then(([cats, cnts]) => {
      if (Array.isArray(cats)) setCategories(cats)
      if (Array.isArray(cnts)) setCountries(cnts)
    })
  }, [])

  const selectedPlatform = watch('platform')

  const onSubmit = async (data: SubmitGroupInput) => {
    setIsSubmitting(true)
    try {
      const res = await fetch('/api/groups', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const result = await res.json()
      if (res.ok) {
        setSubmitted(true)
        toast.success("Group added! It's now live on the site.")
        reset()
        setTags([])
        setTagInput('')
      } else if (res.status === 409) {
        toast.error('This group is already listed.')
      } else if (res.status === 429) {
        toast.error('Too many submissions. Please wait an hour.')
      } else {
        toast.error(result.error?.message || 'Submission failed. Please try again.')
      }
    } catch {
      toast.error('Network error. Please check your connection.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const addTag = (value: string) => {
    const trimmed = value.trim().replace(/^#/, '').toLowerCase()
    if (!trimmed || trimmed.length > 30 || tags.length >= 10 || tags.includes(trimmed)) return
    const newTags = [...tags, trimmed]
    setTags(newTags)
    setValue('tags', newTags)
    setTagInput('')
  }

  const removeTag = (tag: string) => {
    const newTags = tags.filter((t) => t !== tag)
    setTags(newTags)
    setValue('tags', newTags)
  }

  if (submitted) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-10 w-10 text-green-500" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Group Added!</h1>
          <p className="text-muted-foreground mb-8">
            Your group is now live on GroupsHub and will appear in search and browse results immediately.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild className="bg-gradient-to-r from-blue-500 to-violet-600 hover:from-blue-600 hover:to-violet-700 text-white shadow-lg shadow-blue-500/25">
              <Link href="/groupshub/browse">Browse Groups</Link>
            </Button>
            <Button variant="outline" onClick={() => setSubmitted(false)}>
              <Plus className="h-4 w-4 mr-1.5" />
              Add Another Group
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      {/* Header */}
      <div className="border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-8 max-w-2xl">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center shadow-lg shadow-blue-500/25">
              <Plus className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-2xl font-bold">Add a Group</h1>
          </div>
          <p className="text-muted-foreground text-sm ml-13">
            No sign-in required — your group goes live instantly.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="rounded-2xl border border-border/60 bg-card shadow-sm overflow-hidden">

          {/* Platform selector — visual cards at the top */}
          <div className="p-6 border-b border-border/50 bg-muted/30">
            <label className="text-sm font-semibold block mb-3">Platform *</label>
            <div className="grid grid-cols-3 gap-3">
              {Object.values(PLATFORMS).map((p) => {
                const meta = platformIcons[p.id] ?? { icon: null, color: 'text-foreground', bg: 'bg-muted' }
                const isSelected = selectedPlatform === p.id
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setValue('platform', p.id as any)}
                    className={`flex flex-col items-center gap-2 py-3 px-2 rounded-xl border-2 text-sm font-semibold transition-all duration-200 ${
                      isSelected
                        ? `${meta.bg} ${meta.color} border-current scale-[1.02] shadow-md`
                        : 'border-border/50 hover:border-border text-muted-foreground hover:text-foreground bg-background hover:bg-muted/50'
                    }`}
                  >
                    <span className={isSelected ? meta.color : 'text-muted-foreground'}>{meta.icon}</span>
                    {p.label}
                  </button>
                )
              })}
            </div>
            {errors.platform && <p className="text-xs text-destructive mt-2">{errors.platform.message}</p>}
          </div>

          {/* Form fields */}
          <div className="p-6 space-y-5">
            {/* Honeypot */}
            <input {...register('website')} type="text" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

            {/* Group Name */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold">Group Name *</label>
              <Input
                {...register('name')}
                placeholder="e.g. Python Developers Community"
                className={`h-11 ${errors.name ? 'border-destructive' : ''}`}
              />
              {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
            </div>

            {/* Invite Link */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold">Invite Link *</label>
              <Input
                {...register('invite_link')}
                placeholder={
                  selectedPlatform === 'whatsapp'
                    ? 'https://chat.whatsapp.com/...'
                    : selectedPlatform === 'telegram'
                    ? 'https://t.me/...'
                    : 'https://discord.gg/...'
                }
                className={`h-11 font-mono text-sm ${errors.invite_link ? 'border-destructive' : ''}`}
              />
              {errors.invite_link && <p className="text-xs text-destructive">{errors.invite_link.message}</p>}
            </div>

            {/* Category + Country — side by side on md+ */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold">Category *</label>
                <Select onValueChange={(v) => setValue('category_id', v)}>
                  <SelectTrigger className={`h-11 ${errors.category_id ? 'border-destructive' : ''}`}>
                    <SelectValue placeholder="Select category..." />
                  </SelectTrigger>
                  <SelectContent searchable searchPlaceholder="Search categories...">
                    {categories.map((cat, i) => (
                      <React.Fragment key={cat.id}>
                        <SelectItem value={cat.id}>
                          {cat.icon} {cat.name}
                        </SelectItem>
                        {i < categories.length - 1 && <SelectSeparator />}
                      </React.Fragment>
                    ))}
                  </SelectContent>
                </Select>
                {errors.category_id && <p className="text-xs text-destructive">{errors.category_id.message}</p>}
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold">Country *</label>
                <Select onValueChange={(v) => setValue('country_code', v)}>
                  <SelectTrigger className={`h-11 ${errors.country_code ? 'border-destructive' : ''}`}>
                    <SelectValue placeholder="Select country..." />
                  </SelectTrigger>
                  <SelectContent searchable searchPlaceholder="Search countries...">
                    {countries.map((c, i) => (
                      <React.Fragment key={c.code}>
                        <SelectItem value={c.code}>
                          {c.flag_emoji} {c.name}
                        </SelectItem>
                        {i < countries.length - 1 && <SelectSeparator />}
                      </React.Fragment>
                    ))}
                  </SelectContent>
                </Select>
                {errors.country_code && <p className="text-xs text-destructive">{errors.country_code.message}</p>}
              </div>
            </div>

            {/* Language */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold">Primary Language</label>
              <Select defaultValue="en" onValueChange={(v) => setValue('language_code', v)}>
                <SelectTrigger className="h-11">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent searchable searchPlaceholder="Search languages...">
                  {LANGUAGES.map((lang, i) => (
                    <React.Fragment key={lang.code}>
                      <SelectItem value={lang.code}>
                        {lang.name}
                      </SelectItem>
                      {i < LANGUAGES.length - 1 && <SelectSeparator />}
                    </React.Fragment>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Group Icon URL */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold">
                Group Icon URL{' '}
                <span className="text-muted-foreground font-normal">(optional)</span>
              </label>
              <div className="flex items-center gap-3">
                {watch('icon_url') && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={watch('icon_url')}
                    alt="Group icon preview"
                    className="w-10 h-10 rounded-xl object-cover flex-shrink-0 border border-border"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                  />
                )}
                <Input
                  {...register('icon_url')}
                  placeholder="https://example.com/group-icon.jpg"
                  className={`h-11 ${errors.icon_url ? 'border-destructive' : ''}`}
                />
              </div>
              {errors.icon_url && <p className="text-xs text-destructive">{errors.icon_url.message}</p>}
              <p className="text-xs text-muted-foreground">Paste a direct image URL for your group photo</p>
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold">
                Description{' '}
                <span className="text-muted-foreground font-normal">(optional)</span>
              </label>
              <textarea
                {...register('description')}
                rows={3}
                maxLength={300}
                placeholder="Describe what this group is about..."
                className={`w-full rounded-lg border bg-background px-3 py-2.5 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none transition-colors ${errors.description ? 'border-destructive' : 'border-input hover:border-border'}`}
              />
              {errors.description && <p className="text-xs text-destructive">{errors.description.message}</p>}
            </div>

            {/* Tags */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold">
                Tags{' '}
                <span className="text-muted-foreground font-normal">(optional, up to 10)</span>
              </label>
              <div className={`min-h-[44px] flex flex-wrap gap-1.5 items-center rounded-lg border bg-background px-3 py-2 transition-colors focus-within:ring-2 focus-within:ring-ring ${errors.tags ? 'border-destructive' : 'border-input'}`}>
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 text-xs bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 rounded-full px-2.5 py-1 font-medium"
                  >
                    #{tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="text-blue-400 hover:text-blue-600 dark:hover:text-blue-200 ml-0.5 leading-none"
                      aria-label={`Remove tag ${tag}`}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
                {tags.length < 10 && (
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ',') {
                        e.preventDefault()
                        addTag(tagInput)
                      } else if (e.key === 'Backspace' && !tagInput && tags.length > 0) {
                        removeTag(tags[tags.length - 1])
                      }
                    }}
                    onBlur={() => { if (tagInput.trim()) addTag(tagInput) }}
                    placeholder={tags.length === 0 ? 'Type a tag and press Enter...' : ''}
                    className="flex-1 min-w-[140px] bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                    maxLength={31}
                  />
                )}
              </div>
              {errors.tags && <p className="text-xs text-destructive">{errors.tags.message}</p>}
              <p className="text-xs text-muted-foreground">
                Keywords that help people find your group (e.g. crypto, gaming, music)
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 pb-6 pt-2 space-y-3">
            <Button
              type="submit"
              onClick={handleSubmit(onSubmit)}
              className="w-full h-12 text-base font-semibold bg-gradient-to-r from-blue-500 to-violet-600 hover:from-blue-600 hover:to-violet-700 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all duration-200"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Adding Group...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Add Group — Goes Live Instantly
                </span>
              )}
            </Button>
            <p className="text-xs text-center text-muted-foreground">
              No account needed · Group appears immediately · Spam will be removed
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
