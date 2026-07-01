import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { COVER_LETTER_PRICING, getDodoClient, getDodoProductId } from '@/lib/dodo/client'

const checkoutSchema = z.object({
  tier: z.enum(['basic', 'standard', 'premium']),
})

export async function POST(request: NextRequest) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'You must be signed in to purchase a cover letter.' }, { status: 401 })
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 })
  }

  const parsed = checkoutSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
  }

  const { tier } = parsed.data
  const pricing = COVER_LETTER_PRICING[tier]
  const productId = getDodoProductId(tier)

  if (!productId) {
    console.error(`Dodo product id not configured for tier "${tier}"`)
    return NextResponse.json({ error: 'This plan is not available right now. Please try another plan.' }, { status: 500 })
  }

  const admin = createAdminClient()
  const { data: order, error: insertError } = await admin
    .from('cover_letter_orders')
    .insert({
      user_id: user.id,
      tier,
      amount_cents: pricing.amountCents,
      status: 'pending',
    })
    .select('id')
    .single()

  if (insertError || !order) {
    console.error('Failed to create cover letter order:', insertError)
    return NextResponse.json({ error: 'Could not start checkout. Please try again.' }, { status: 500 })
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || request.nextUrl.origin

  try {
    const dodo = getDodoClient()
    const session = await dodo.checkoutSessions.create({
      product_cart: [{ product_id: productId, quantity: 1 }],
      return_url: `${appUrl}/cover-letter-generator?order_id=${order.id}`,
      metadata: { order_id: order.id, user_id: user.id, tier },
    })

    await admin
      .from('cover_letter_orders')
      .update({ dodo_checkout_id: session.session_id })
      .eq('id', order.id)

    if (!session.checkout_url) {
      return NextResponse.json({ error: 'Could not start checkout. Please try again.' }, { status: 502 })
    }

    return NextResponse.json({ checkoutUrl: session.checkout_url })
  } catch (error) {
    console.error('Dodo checkout session creation failed:', error)
    await admin.from('cover_letter_orders').update({ status: 'failed' }).eq('id', order.id)
    return NextResponse.json({ error: 'Could not start checkout. Please try again.' }, { status: 502 })
  }
}
