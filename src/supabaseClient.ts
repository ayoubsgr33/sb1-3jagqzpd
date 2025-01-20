import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.(params:type) => {
    
}.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);