<template>
  <div>
    <h2 class="text-2xl font-semibold mb-4">My Applications</h2>
    <button class="btn-primary mb-4" @click="createNew">+ New App</button>
    <div v-if="apps.length === 0">No apps yet.</div>
    <div v-for="app in apps" :key="app.id" class="p-4 border rounded mb-2">
      <h3 class="font-semibold">{{ app.name }}</h3>
      <p>{{ app.repoUrl }}</p>
      <button @click="deploy(app.id)" class="btn-primary mt-2">Deploy</button>
    </div>
  </div>
</template>

<script setup>
import { useAppStore } from '@/store/appStore'
import { useDeployStore } from '@/store/deployStore'
import { onMounted } from 'vue'

const appStore = useAppStore()
const deployStore = useDeployStore()
const apps = appStore.apps

onMounted(appStore.load)
const deploy = async id => await deployStore.trigger(id)
const createNew = async () => {
  const name = prompt('Enter app name:')
  if (name) await appStore.addApp({ name })
}
</script>
