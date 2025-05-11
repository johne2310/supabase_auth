<script setup>
import { onMounted, ref } from 'vue'
import { useAuthStore } from 'stores/auth-store.js'
import supabase from 'stores/supabaseClient.js'
// import { useRouter } from 'vue-router'

// const router = useRouter()
const email = ref('')
const authStore = useAuthStore()

onMounted(async () => {
  console.log('Reset page mounted')
  supabase.auth.onAuthStateChange(async (event, session) => {
    if (event === 'PASSWORD_RECOVERY') {
      authStore.user = session.user
      console.log('User for reset is', email.value)
    }
    if (event === 'SIGNED_IN') {
      console.log('User signed in', session)
    }
  })
})

const resetPassword = async () => {
  console.log('Attempting to reset password with:', email.value)
  const { data, error } = await supabase.auth.updateUser({ password: email.value })
  if (error) {
    console.log(error)
  } else {
    console.log('User: ', data)
  }
}
</script>

<template>
  <q-page class="flex flex-center">
    <div class="q-pa-md row items-start q-gutter-md">
      <q-card bordered class="bg-grey-2 my-card" flat>
        <q-card-section>
          <div class="text-h6">Password Reset Page</div>
          <div class="text-subtitle2">Supabase auth example</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-form class="q-gutter-md" @submit="resetPassword">
            <q-input v-model="email" filled label="Reset password" type="password" />

            <div>
              <q-btn color="primary" label="Reset Password" size="md" type="submit" />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<style scoped></style>
