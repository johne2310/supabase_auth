<script setup>
import { ref } from 'vue'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'
import { useAuthStore } from 'stores/auth-store.js'
import supabase from 'stores/supabaseClient.js'

//set variables
const email = ref('')
const password = ref('')
// let user = ref(null)
// const errorMessage = ref('')
const $q = useQuasar()
const router = useRouter()
const authStore = useAuthStore()

//validation rules
const emailRules = [
  (val) => !!val || 'Email is required',
  (val) => /.+@.+\..+/.test(val) || 'Email must be valid',
]

//functions
const registerUser = async () => {
  // Placeholder function for Supabase login
  console.log('Attempting to log in with:', email.value, password.value)
  $q.notify({
    message: 'Login attempt (placeholder)',
    color: 'info',
  })
  // Implement actual Supabase login logic here

  const { data, error } = await supabase.auth.signUp({
    email: email.value,
    password: password.value,
  })

  if (error) {
    console.log(error)
  } else {
    console.log('User: ', data)
  }
  // user = data.session.user
}

//log in to Supabase
const login = async () => {
  console.log('Attempting to log in with:', email.value, password.value)

  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  })
  if (error) {
    console.log(error)
  } else {
    console.log('User: ', data)
    authStore.user = data.session.user
    console.log('after login user is : ', authStore.user)
    await getCurrentUser()
    // router.push('/secret')
  }
}

//get current user
const getCurrentUser = async () => {
  supabase.auth.onAuthStateChange(async (event, session) => {
    if (event === 'SIGNED_IN') {
      console.log('User signed in', session)
      getUser()
      router.push('/secret')
    } else if (event === 'SIGNED_OUT') {
      console.log('User signed out')
      router.push('/')
    } else if (event === 'PASSWORD_RECOVERY') {
      console.log('Password recovery')
    } else if (event === 'EMAIL_VERIFICATION') {
      console.log('Email verification')
    }
  })
}

const getUser = async () => {
  const localUser = await supabase.auth.getSession()
  console.log('User is: ', localUser.data.session.user.email)
  authStore.user = localUser.data.session.user
  console.log('AuthStore User: ', authStore.user)
}

//reset password
const resetPassword = async () => {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email.value, {
    redirectTo: 'http://localhost:9000/reset-password',
  })
  if (data) {
    console.log('Password reset email sent')
    if (error) {
      console.log('Error resetting password', error)
    }
  }
}

// const passwordRules = [(val) => !!val || 'Password is required'
</script>

<template>
  <q-page class="flex flex-center">
    <div class="q-pa-md row items-start q-gutter-md">
      <q-card bordered class="bg-grey-2 my-card" flat>
        <q-card-section>
          <div class="text-h6">Login Page</div>
          <div class="text-subtitle2">Supabase auth example</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-form class="q-gutter-md" @submit="login">
            <q-input v-model="email" :rules="emailRules" filled label="Email" type="email" />

            <q-input v-model="password" filled label="Password" type="password" />

            <div>
              <q-btn color="primary" label="Login" size="md" type="submit" /> &nbsp;
              <q-btn color="secondary" label="Register" size="md" @click="registerUser" /> &nbsp;
              <q-btn
                color="secondary"
                flat
                label="Reset Password"
                size="md"
                @click="resetPassword"
              />
              <q-btn color="info" flat label="Get user" size="md" @click="getUser" />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<style scoped>
.my-card {
  width: 700px;
  height: 500px;
  max-width: 500px;
}
</style>
