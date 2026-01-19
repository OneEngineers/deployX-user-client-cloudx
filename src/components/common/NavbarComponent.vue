<template>
  <header class="flex justify-between items-center bg-white p-4 rounded shadow">
    <h1 class="font-bold text-lg">Deploy Dashboard</h1>
    <button @click="logout" class="text-sm text-red-600">Logout</button>
  </header>
</template>

<script setup>
import { useAuthStore } from '@/store/authStore'
const auth = useAuthStore()
const logout = () => auth.logout()
</script>
