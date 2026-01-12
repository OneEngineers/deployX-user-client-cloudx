import { defineStore } from 'pinia'
import { fetchApps, createApp, deleteApp } from '@/api/appService'

export const useAppStore = defineStore('app', {
    state: () => ({
        apps: [],
        loading: false
    }),
    actions: {
        async load() {
            this.loading = true
            const { data } = await fetchApps()
            this.apps = data
            this.loading = false
        },
        async addApp(payload) {
            await createApp(payload)
            await this.load()
        },
        async remove(id) {
            await deleteApp(id)
            this.apps = this.apps.filter(a => a.id !== id)
        }
    }
})
