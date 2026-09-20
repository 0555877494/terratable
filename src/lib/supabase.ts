import { createClient } from '@supabase/supabase-js';

// Supabase configuration
// Get these from your Supabase project dashboard:
// https://supabase.com/dashboard/project/YOUR_PROJECT/settings/api
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});

// Check if Supabase is properly configured
export const isSupabaseConfigured = () => {
  return (
    supabaseUrl !== 'https://your-project.supabase.co' &&
    supabaseAnonKey !== 'your-anon-key'
  );
};

// Helper to check if we should use Supabase or fallback to localStorage
export const shouldUseSupabase = () => {
  return isSupabaseConfigured();
};

export default supabase;
