import type { Database } from './database.types'

export type Group = Database['public']['Tables']['groups']['Row']
export type Category = Database['public']['Tables']['categories']['Row']
export type Country = Database['public']['Tables']['countries']['Row']

export interface GroupWithCategory extends Group {
  categories: Category | null
  countries: Country | null
}

export interface GroupsApiResponse {
  groups: GroupWithCategory[]
  total: number
  page: number
  totalPages: number
}

export interface GroupFilters {
  platform?: 'whatsapp' | 'telegram' | 'discord'
  category?: string
  country?: string
  language?: string
  sort?: 'newest' | 'trending' | 'most-joined'
  page?: number
  q?: string
}
