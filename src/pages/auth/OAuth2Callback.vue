<template>
  <div>Logging in...</div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useAuthStore } from '@/store/authStore'
import { useRouter } from 'vue-router'
import axiosInstance from '@/api/axiosInstance'

const auth = useAuthStore()
const router = useRouter()

onMounted(async () => {
  try {
    // Fetch user info from backend using cookie
    const res = await axiosInstance.get('/api/auth/me')
    auth.setUser(res.data)
  } catch (e) {
    console.error(e)
  }
})
</script>
