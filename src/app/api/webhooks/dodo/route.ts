import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { getDodoClient } from '@/lib/dodo/client'

export async function POST(request: NextRequest) {
  const rawBody = await request.text()
  const headers = Object.fromEntries(request.headers.entries())

  let event
  try {
    const dodo = getDodoClient()
    event = dodo.webhooks.unwrap(rawBody, { headers })
  } catch (error) {
    console.error('Dodo webhook signature verification failed:', error)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  const admin = createAdminClient()

  switch (event.type) {
    case 'payment.succeeded': {
      const orderId = event.data.metadata?.order_id
      if (!orderId) {
        console.error('payment.succeeded webhook missing order_id metadata', event.data.payment_id)
        break
      }
      const { error } = await admin
        .from('cover_letter_orders')
        .update({ status: 'paid', dodo_payment_id: event.data.payment_id })
        .eq('id', orderId)
        .eq('status', 'pending')
      if (error) {
        console.error('Failed to mark cover letter order paid:', error)
        return NextResponse.json({ error: 'Failed to process webhook' }, { status: 500 })
      }
      break
    }
    case 'payment.failed':
    case 'payment.cancelled': {
      const orderId = event.data.metadata?.order_id
      if (orderId) {
        await admin
          .from('cover_letter_orders')
          .update({ status: 'failed' })
          .eq('id', orderId)
          .eq('status', 'pending')
      }
      break
    }
    default:
      break
  }

  return NextResponse.json({ received: true })
}
