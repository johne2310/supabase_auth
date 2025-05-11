// src/stores/auth-store.js
import { defineStore } from 'pinia'
import supabase from 'stores/supabaseClient.js'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: '',
  }),
  actions: {
    async initialize() {
      // Fetch the initial user state from Supabase
      // const user = supabase.auth.getUseruser()
      // this.user = user

      // Optional: Listen for auth state changes
      supabase.auth.onAuthStateChange((event, session) => {
        if (event === 'SIGNED_IN') {
          this.user = session.user
        } else this.user = ''
      })
    },

    async register(email, password) {
      const { data, error } = await supabase.auth.signUp({ email, password })
      if (error) throw error
      this.user = data.user
    },

    async login(email, password) {
      const { user, error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error
      this.user = user
    },
    async resetPassword(email) {
      const { error } = await supabase.auth.api.resetPasswordForEmail(email)
      if (error) throw error
    },
    async fetchUser() {
      const { data, error } = await supabase.auth.getSession()
      if (error) throw error
      if (!data) return
      if (data) this.user = data.session.user
      console.log('Fetched data: ', this.user)
    },
    async logout() {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      this.user = ''
      console.log('User: ', this.user)
    },
  },
})
