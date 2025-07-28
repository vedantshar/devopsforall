import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://opscurator.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          name: string
          role: 'user' | 'admin'
          work_title?: string
          mobile_number?: string
          company?: string
          experience_level?: string
          completed_labs: string[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          name: string
          role?: 'user' | 'admin'
          work_title?: string
          mobile_number?: string
          company?: string
          experience_level?: string
          completed_labs?: string[]
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string
          role?: 'user' | 'admin'
          work_title?: string
          mobile_number?: string
          company?: string
          experience_level?: string
          completed_labs?: string[]
          updated_at?: string
        }
      }
      lab_comments: {
        Row: {
          id: string
          lab_id: string
          user_id: string
          comment: string
          rating: number
          created_at: string
        }
        Insert: {
          id?: string
          lab_id: string
          user_id: string
          comment: string
          rating: number
          created_at?: string
        }
        Update: {
          id?: string
          lab_id?: string
          user_id?: string
          comment?: string
          rating?: number
        }
      }
      daily_challenges: {
        Row: {
          id: string
          title: string
          description: string
          category: string
          difficulty: string
          date: string
          completed_by: string[]
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          category: string
          difficulty: string
          date: string
          completed_by?: string[]
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          category?: string
          difficulty?: string
          date?: string
          completed_by?: string[]
        }
      }
    }
  }
}