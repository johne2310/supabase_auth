import { createClient } from '@supabase/supabase-js'

console.log('Supabase URL: ', import.meta.env.VITE_SUPABASE_URL)
console.log('Supabase KEY: ', import.meta.env.VITE_SUPABASE_ANON_KEY)

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default supabase
