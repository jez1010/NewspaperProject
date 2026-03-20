import { createClient } from "@supabase/supabase-js";

export const baseUrl = (process.env.REACT_APP_API_URL || "").replace(/\/$/, "");

export const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_KEY,
)