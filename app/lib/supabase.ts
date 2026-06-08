import { createClient } from "@supabase/supabase-js";

// Public values — safe to ship in the client. The publishable key is locked to
// INSERT-only on the `applications` table via Row-Level Security, so it cannot
// read, update, or delete any data.
const SUPABASE_URL = "https://nxibeiykcgxpbmkeadth.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_0XafzUO0oxkFE1hkKzKqsw_LvnBdMNz";

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: { persistSession: false, autoRefreshToken: false },
});
