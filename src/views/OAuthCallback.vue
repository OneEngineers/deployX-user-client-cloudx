<script setup>
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

onMounted(async () => {
  const token = route.query.token

  if (token) {
    try {
      await authStore.initializeAuth(token)
      router.push('/')
    } catch (err) {
      router.push('/login?error=auth_failed')
    }
  } else {
    router.push('/login')
  }
})
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen space-y-4">
    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    <p class="text-slate-600 font-medium">Finalizing login...</p>
  </div>
</template>
