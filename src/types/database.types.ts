export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      groups: {
        Row: {
          id: string
          name: string
          slug: string
          platform: 'whatsapp' | 'telegram' | 'discord'
          invite_link: string
          category_id: string | null
          country_code: string | null
          language_code: string | null
          description: string | null
          member_count: number
          tags: string[]
          is_featured: boolean
          is_verified: boolean
          is_approved: boolean
          reported_count: number
          views: number
          joins_count: number
          featured_until: string | null
          submitter_ip_hash: string | null
          search_vector: string | null
          icon_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug?: string
          platform: 'whatsapp' | 'telegram' | 'discord'
          invite_link: string
          category_id?: string | null
          country_code?: string | null
          language_code?: string | null
          description?: string | null
          member_count?: number
          tags?: string[]
          is_featured?: boolean
          is_verified?: boolean
          is_approved?: boolean
          icon_url?: string | null
          reported_count?: number
          views?: number
          joins_count?: number
          featured_until?: string | null
          submitter_ip_hash?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          platform?: 'whatsapp' | 'telegram' | 'discord'
          invite_link?: string
          category_id?: string | null
          country_code?: string | null
          language_code?: string | null
          description?: string | null
          member_count?: number
          tags?: string[]
          is_featured?: boolean
          is_verified?: boolean
          is_approved?: boolean
          reported_count?: number
          views?: number
          joins_count?: number
          featured_until?: string | null
          submitter_ip_hash?: string | null
          icon_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      categories: {
        Row: {
          id: string
          name: string
          slug: string
          icon: string
          color: string
          group_count: number
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          icon?: string
          color?: string
          group_count?: number
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          icon?: string
          color?: string
          group_count?: number
          created_at?: string
        }
        Relationships: []
      }
      countries: {
        Row: {
          code: string
          name: string
          flag_emoji: string
          continent: string
          region: string | null
        }
        Insert: {
          code: string
          name: string
          flag_emoji?: string
          continent: string
          region?: string | null
        }
        Update: {
          code?: string
          name?: string
          flag_emoji?: string
          continent?: string
          region?: string | null
        }
        Relationships: []
      }
      reports: {
        Row: {
          id: string
          group_id: string
          reason: 'spam' | 'inappropriate' | 'broken_link' | 'wrong_category' | 'other'
          description: string | null
          ip_hash: string
          created_at: string
        }
        Insert: {
          id?: string
          group_id: string
          reason: 'spam' | 'inappropriate' | 'broken_link' | 'wrong_category' | 'other'
          description?: string | null
          ip_hash: string
          created_at?: string
        }
        Update: {
          id?: string
          group_id?: string
          reason?: 'spam' | 'inappropriate' | 'broken_link' | 'wrong_category' | 'other'
          description?: string | null
          ip_hash?: string
          created_at?: string
        }
        Relationships: []
      }
      rate_limits: {
        Row: {
          ip_hash: string
          action: string
          window_start: string
          count: number
        }
        Insert: {
          ip_hash: string
          action?: string
          window_start?: string
          count?: number
        }
        Update: {
          ip_hash?: string
          action?: string
          window_start?: string
          count?: number
        }
        Relationships: []
      }
      cover_letter_orders: {
        Row: {
          id: string
          user_id: string
          tier: 'basic' | 'standard' | 'premium'
          amount_cents: number
          currency: string
          dodo_checkout_id: string | null
          dodo_payment_id: string | null
          status: 'pending' | 'paid' | 'used' | 'failed'
          used_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          tier: 'basic' | 'standard' | 'premium'
          amount_cents: number
          currency?: string
          dodo_checkout_id?: string | null
          dodo_payment_id?: string | null
          status?: 'pending' | 'paid' | 'used' | 'failed'
          used_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          tier?: 'basic' | 'standard' | 'premium'
          amount_cents?: number
          currency?: string
          dodo_checkout_id?: string | null
          dodo_payment_id?: string | null
          status?: 'pending' | 'paid' | 'used' | 'failed'
          used_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
  }
}
