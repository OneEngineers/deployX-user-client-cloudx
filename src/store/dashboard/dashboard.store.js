import { defineStore } from 'pinia'
import http from '@/utils/axiosClient'

export const useDashboardStore = defineStore('dashboard', {
  state: () => ({
    items: [],
    loading: false,
    isSidebarOpen: true,
    searchQuery: '',
    dialog: false,
    isEdit: false,
    errorMessage: null,
    validationErrors: null,
    form: { id: null, name: '', gitUrl: '' }
  }),

  actions: {
    async fetchAll() {
      this.loading = true
      this.errorMessage = null
      try {
        const response = await http.get('/deploys', {
          params: this.searchQuery ? { name: this.searchQuery } : {}
        })
        this.items = response.data || response || []
      } catch (e) {
        console.error('Fetch error:', e)
        this.errorMessage = 'Failed to load deployments. Service may be offline.'
      } finally {
        this.loading = false
      }
    },

    openModal(item = null) {
      this.validationErrors = null
      this.errorMessage = null
      if (item) {
        this.isEdit = true
        this.form = { id: item.id, name: item.name, gitUrl: item.gitUrl }
      } else {
        this.isEdit = false
        this.form = { id: null, name: '', gitUrl: '' }
      }
      this.dialog = true
    },

    async save() {
      this.loading = true
      this.validationErrors = null
      this.errorMessage = null
      try {
        if (!this.form.name.trim()) {
          this.validationErrors = { name: 'Project name is required' }
          return
        }

        const payload = {
          name: this.form.name,
          gitUrl: this.form.gitUrl
        }

        if (this.isEdit) {
          await http.put(`/deploys/${this.form.id}`, payload)
          this.errorMessage = 'Project updated successfully'
        } else {
          await http.post('/deploys', payload)
          this.errorMessage = 'Project created successfully'
        }
        this.dialog = false
        await this.fetchAll()
      } catch (e) {
        console.error('Save error:', e)
        this.errorMessage = e.response?.data?.message || 'Failed to save project'
      } finally {
        this.loading = false
      }
    },

    async delete(id) {
      if (!confirm('Confirm permanent deletion? This action cannot be undone.')) return
      try {
        await http.delete(`/deploys/${id}`)
        this.items = this.items.filter(i => i.id !== id)
        this.errorMessage = 'Project deleted successfully'
      } catch (e) {
        console.error('Delete error:', e)
        this.errorMessage = e.response?.data?.message || 'Failed to delete project'
      }
    },

    async runDeploy(id) {
      this.loading = true
      this.errorMessage = null
      try {
        await http.post(`/deploys/${id}/run`)
        this.errorMessage = 'Deployment triggered successfully! Pipeline is running...'
        await new Promise(r => setTimeout(r, 1500))
        await this.fetchAll()
      } catch (e) {
        console.error('Deploy error:', e)
        this.errorMessage = e.response?.data?.message || 'Failed to trigger deployment'
      } finally {
        this.loading = false
      }
    }
  }
})
