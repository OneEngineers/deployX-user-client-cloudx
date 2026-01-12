import { defineStore } from 'pinia'
import { getDeployments, triggerDeployment } from '@/api/deployService'

export const useDeployStore = defineStore('deploy', {
    state: () => ({
        deployments: [],
        loading: false
    }),
    actions: {
        async load() {
            this.loading = true
            const { data } = await getDeployments()
            this.deployments = data
            this.loading = false
        },
        async trigger(appId) {
            await triggerDeployment(appId)
            await this.load()
        }
    }
})
