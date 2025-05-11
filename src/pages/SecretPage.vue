<script setup>
import { onMounted, ref } from 'vue'
import { useAuthStore } from 'stores/auth-store.js'
import supabase from 'stores/supabaseClient.js'

const authStore = useAuthStore()

let user = ref({})
let email = ref('')
let id = ref('')

// user.v = authStore.user
// email = user.email
// id = user.id

onMounted(async () => {
  const { data, error } = await supabase.auth.getSession()
  if (error) throw error
  if (data) {
    user.value = data.session.user
    email.value = user.value.email
    id.value = user.value.id
    console.log('User from secret page: ', user)
  }
})
</script>

<template>
  <q-page class="flex flex-center">
    <div class="q-pa-md row items-start q-gutter-md">
      <q-card bordered class="bg-grey-3 my-card">
        <q-card-section>
          <div class="text-h3">SECRET Page</div>
          <div class="text-subtitle2">Supabase auth example</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          You need to login to see the content of this page <br />
          User is: {{ email }} <br />
          UserID: {{ id }}
        </q-card-section>
      </q-card>
      <q-btn color="primary" label="reload" @click="authStore.fetchUser()" />
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
