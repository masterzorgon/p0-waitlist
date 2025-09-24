import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL!
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface WalletPoints {
  authority: string
  rank: number
  marginfi_points: number
  adjusted_points: number
  total_points: number
}

export interface PointsResponse {
  success: boolean
  data?: WalletPoints
  error?: string
}
