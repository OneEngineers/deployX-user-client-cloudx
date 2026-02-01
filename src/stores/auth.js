import { defineStore } from 'pinia'
import api from '@/services/api'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    user: null,
    githubRepos: [],
    loading: false,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
    dashboardStats: (state) => [
      {
        label: 'Total Projects',
        value: state.githubRepos.length,
        trend: 'Live',
        trendUp: true,
      },
      { label: 'Deployments', value: '154', trend: '+12%', trendUp: true },
      { label: 'System Health', value: '99.9%', trend: 'Stable', trendUp: true },
      { label: 'Active Alerts', value: '2', trend: '+1', trendUp: false },
    ],
  },

  actions: {
    async initializeAuth(token) {
      this.token = token
      localStorage.setItem('token', token)
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`
      await this.fetchProfile()
    },

    async fetchProfile() {
      try {
        const userResponse = await api.get('/user/me')
        this.user = userResponse.data
      } catch (error) {
        this.logout()
      }
    },

    async fetchGithubRepos() {
      this.loading = true
      try {
        const response = await api.get('/user/github/repos')
        this.githubRepos = response || []
      } catch (error) {
        console.error('Failed to fetch GitHub repos', error)
        this.githubRepos = []
      } finally {
        this.loading = false
      }
    },

    logout() {
      this.token = null
      this.user = null
      this.githubRepos = []
      localStorage.removeItem('token')
      delete api.defaults.headers.common['Authorization']
      window.location.href = '/login'
    },
  },
})
