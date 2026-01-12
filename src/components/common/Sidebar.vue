<template>
    <aside class="sidebar">
        <ul>
            <!-- Admin Menu -->
            <template v-if="user?.role === 'ADMIN'">
                <li><router-link to="/admin/dashboard">Dashboard</router-link></li>
                <li><router-link to="/admin/users">Users</router-link></li>
                <li><router-link to="/admin/clusters">Clusters</router-link></li>
            </template>

            <!-- Developer Menu -->
            <template v-else-if="user?.role === 'DEVELOPER'">
                <li><router-link to="/developer/apps">My Apps</router-link></li>
                <li><router-link to="/developer/deployments">Deployments</router-link></li>
                <li><router-link to="/developer/logs">Logs</router-link></li>
            </template>
        </ul>
    </aside>
</template>

<script setup>
import { useAuthStore } from '@/store/authStore'
const { user } = useAuthStore()
</script>
