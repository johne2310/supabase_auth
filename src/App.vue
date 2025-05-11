<template>
  <router-view />
</template>

<script setup>
import supabase from 'src/stores/supabaseClient.js'
import { ref } from 'vue'

const user = ref(null)

supabase.auth.onAuthStateChange((event, session) => {
  user.value = session?.user || null
})
//
// import { onMounted } from 'vue'
// import { useAuthStore } from 'src/stores/auth-store'
//
// const authStore = useAuthStore()
//
// // Initialize auth store when app starts
// onMounted(async () => {
//   await authStore.initialize()
// })
</script>
