import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://opfpcpyqzcgzrjjhbecw.supabase.co';
const supabaseKey =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9wZnBjcHlxemNnenJqamhiZWN3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAyMTM5MDcsImV4cCI6MjA1NTc4OTkwN30.lo4jmF9rp1R9kwgt6gms47kDQcUb_a3PP1DUpasm0lg';

export const supabase = createClient(supabaseUrl, supabaseKey);
