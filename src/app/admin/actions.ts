'use server'

import { createAdminClient } from '@/lib/supabase/admin'
import { revalidatePath } from 'next/cache'

export async function approveGroup(id: string) {
  const supabase = createAdminClient()
  // Supabase typed update — cast to any to work around TS server action inference bug
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  await (supabase as any).from('groups').update({ is_approved: true }).eq('id', id)
  revalidatePath('/admin/approvals')
}

export async function rejectGroup(id: string) {
  const supabase = createAdminClient()
  await supabase.from('groups').delete().eq('id', id)
  revalidatePath('/admin/approvals')
}

export async function dismissReport(id: string) {
  const supabase = createAdminClient()
  await supabase.from('reports').delete().eq('id', id)
  revalidatePath('/admin/reports')
}

export async function banGroup(groupId: string) {
  const supabase = createAdminClient()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  await (supabase as any).from('groups').update({ is_approved: false }).eq('id', groupId)
  await supabase.from('reports').delete().eq('group_id', groupId)
  revalidatePath('/admin/reports')
}
