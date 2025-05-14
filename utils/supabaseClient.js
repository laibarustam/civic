import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Create a custom Supabase client with specific options
export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: false, // Don't persist the session to avoid auth issues
    autoRefreshToken: false, // Don't auto refresh token
  },
  // Set global headers if needed
  global: {
    headers: {
      "X-Client-Info": "civic-connect-app",
    },
  },
});
