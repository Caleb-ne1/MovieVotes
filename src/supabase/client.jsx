import { createClient } from '@supabase/supabase-js';

//initialize a new client

const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_KEY);

export default supabase