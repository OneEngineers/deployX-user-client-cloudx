<template>
    <div class="flex min-h-screen">
        <Sidebar admin />
        <main class="flex-1 p-6 bg-gray-50">
            <Navbar />
            <router-view />
        </main>
    </div>
</template>

<script setup>
import Sidebar from '@/components/common/Sidebar.vue'
import Navbar from '@/components/common/Navbar.vue'
</script>
