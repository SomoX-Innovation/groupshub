import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import Anthropic from '@anthropic-ai/sdk'
import { coverLetterSchema, LENGTHS } from '@/lib/validations/cover-letter.schema'
import { getIpFromRequest, hashIp } from '@/lib/utils/ip-hash'
import { checkRateLimit } from '@/lib/utils/rate-limit'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'

const SYSTEM_PROMPT = `You write cover letters for a professional freelance cover-letter-writing service.

Rules:
- Write clear, natural-sounding, non-generic cover letters that read like a real person wrote them.
- Never use cliches like "I am excited to apply", "I am writing to express my interest", "I believe I would be a great fit", or similar stock phrases.
- Reference specific, concrete details from the candidate's resume/background and from the job description so the letter reads as genuinely tailored to this role — not a template.
- Do not invent facts, employers, dates, or achievements that are not present in the provided resume/background.
- Output ONLY the letter body text. No markdown formatting, no headers, no subject line, no "Dear Hiring Manager" preamble commentary, no explanation of what you wrote — just the letter itself, ready to send.`

export async function POST(request: NextRequest) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'You must be signed in to generate a cover letter.' }, { status: 401 })
  }

  const ip = getIpFromRequest(request)
  const rateLimit = checkRateLimit(hashIp(ip))

  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { status: 429, headers: { 'Retry-After': Math.ceil((rateLimit.resetAt - Date.now()) / 1000).toString() } }
    )
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 })
  }

  const parsed = coverLetterSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
  }

  const orderIdParsed = z.object({ orderId: z.string().uuid('A valid paid order is required.') }).safeParse(body)
  if (!orderIdParsed.success) {
    return NextResponse.json({ error: orderIdParsed.error.flatten() }, { status: 400 })
  }
  const { orderId } = orderIdParsed.data

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    console.error('ANTHROPIC_API_KEY is not set')
    return NextResponse.json({ error: 'Cover letter generation is not configured.' }, { status: 500 })
  }

  const { resume, jobDescription, company, tone, specificPoints, length } = parsed.data
  const targetWords = LENGTHS[length].words

  // Atomically claim the paid order so concurrent requests can't spend it twice.
  const admin = createAdminClient()
  const { data: claimedOrder, error: claimError } = await admin
    .from('cover_letter_orders')
    .update({ status: 'used', used_at: new Date().toISOString() })
    .eq('id', orderId)
    .eq('user_id', user.id)
    .eq('tier', length)
    .eq('status', 'paid')
    .select('id')
    .single()

  if (claimError || !claimedOrder) {
    return NextResponse.json(
      { error: 'No paid order found for this plan. Please purchase a cover letter first.' },
      { status: 402 }
    )
  }

  const userPrompt = `Write a cover letter with these details:

CANDIDATE'S RESUME / BACKGROUND:
${resume}

JOB DESCRIPTION:
${jobDescription}
${company ? `\nTARGET COMPANY: ${company}` : ''}

TONE: ${tone}
TARGET LENGTH: approximately ${targetWords} words
${specificPoints ? `\nSPECIFIC POINTS TO INCLUDE:\n${specificPoints}` : ''}

Write the complete cover letter now. Output only the letter body.`

  try {
    const client = new Anthropic({ apiKey })
    const message = await client.messages.create({
      model: 'claude-sonnet-5',
      max_tokens: 1000,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: userPrompt }],
    })

    const textBlock = message.content.find((block) => block.type === 'text')
    const letter = textBlock?.type === 'text' ? textBlock.text.trim() : ''

    if (!letter) {
      await releaseOrder(admin, orderId)
      return NextResponse.json({ error: 'The model did not return any content. Please try again.' }, { status: 502 })
    }

    return NextResponse.json({ letter })
  } catch (error) {
    await releaseOrder(admin, orderId)
    if (error instanceof Anthropic.RateLimitError) {
      return NextResponse.json({ error: 'The AI service is busy right now. Please try again in a moment.' }, { status: 429 })
    }
    if (error instanceof Anthropic.APIError) {
      console.error('Anthropic API error:', error.status, error.message)
      return NextResponse.json({ error: 'Failed to generate the cover letter. Please try again.' }, { status: 502 })
    }
    console.error('Unexpected error generating cover letter:', error)
    return NextResponse.json({ error: 'An unexpected error occurred. Please try again.' }, { status: 500 })
  }
}

// Give the order back to the user if generation failed after it was claimed.
async function releaseOrder(admin: ReturnType<typeof createAdminClient>, orderId: string) {
  const { error } = await admin
    .from('cover_letter_orders')
    .update({ status: 'paid', used_at: null })
    .eq('id', orderId)
    .eq('status', 'used')
  if (error) {
    console.error(`Failed to release cover letter order ${orderId} after generation failure:`, error)
  }
}
