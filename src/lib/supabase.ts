import { createClient } from "@supabase/supabase-js";
import { Database } from "./api/types";
const PROJECT_URL = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient<Database>(PROJECT_URL, ANON_KEY);
