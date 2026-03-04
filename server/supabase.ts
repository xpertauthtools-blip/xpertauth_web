import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://dcuvptwwtdhlepvcttvx.supabase.co";
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

if (!SUPABASE_SERVICE_KEY) {
  throw new Error("SUPABASE_SERVICE_KEY environment variable is required");
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);
