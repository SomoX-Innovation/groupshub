'use client'

import { Trash2 } from 'lucide-react'

interface Props {
  id: string
  name: string
  deleteAction: (id: string) => Promise<void>
}

export function DeleteGroupButton({ id, name, deleteAction }: Props) {
  return (
    <form action={deleteAction.bind(null, id)}>
      <button
        type="submit"
        title="Delete"
        className="p-1.5 rounded-md text-destructive hover:bg-destructive/10 transition-colors"
        onClick={(e) => { if (!confirm(`Delete "${name}"?`)) e.preventDefault() }}
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </form>
  )
}
