<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title> Quasar App</q-toolbar-title>

        <div>
          <q-btn flat icon="home" label="Home" @click="router.push('/')" />
          <q-btn flat label="Login" @click="router.push('/login')" />
          <q-btn flat label="Logout" @click="logout" />
          Ver: {{ packageInfo.version }}
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
// import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from 'stores/auth-store.js'
import packageInfo from '../../package.json'

const router = useRouter()
const authStore = useAuthStore()

//logput
const logout = async () => {
  await authStore.logout()
  router.push('/')
  console.log('go home')
  // }
}

// const goHome = () => {
//   router.push('/')
//   console.log('go home')
// }
</script>
