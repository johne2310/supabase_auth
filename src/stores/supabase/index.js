import { createClient } from '@supabase/supabase-js'

// Supabase configuration
// Replace these with your own Supabase project URL and anon key
// You can find these in your Supabase project settings > API

console.log('Supabase URL: ', import.meta.env.VITE_SUPABASE_URL)
console.log('Supabase KEY: ', import.meta.env.VITE_SUPABASE_LINK)

const supabaseKey = import.meta.env.VITE_SUPABASE_LINK
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL

// const supabaseUrl = 'https://lmvvkbraxtmilcpxbijt.supabase.co' // e.g., 'https://yourproject.supabase.co'
// const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxtdnZrYnJheHRtaWxjcHhiaWp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU1NjQ2MTQsImV4cCI6MjA2MTE0MDYxNH0.xZKZFRFdmKB97sI6t7ygmwg3N1P-RUMUtsydLnopVwY' // Your project's anon/public key

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseKey)
console.log('Supabase client initialized')

export default supabase
