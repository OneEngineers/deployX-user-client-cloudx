<template>
  <div>Logging in...</div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useAuthStore } from '@/store/authStore'
import axiosInstance from '@/api/axiosInstance'

const auth = useAuthStore()

onMounted(async () => {
  try {
    const res = await axiosInstance.get('/api/auth/me')
    auth.setUser(res.data)
  } catch (e) {
    console.error(e)
  }
})
</script>
