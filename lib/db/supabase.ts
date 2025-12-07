import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  // Warn but don't crash on build
  if (typeof window !== 'undefined') {
    console.warn('Supabase URL or Key is missing from environment variables.');
  }
}

export const supabase = createClient(supabaseUrl, supabaseKey);
