import { defineStore } from 'pinia'
import { loginAPI, getProfile, logoutAPI } from '@/api/authService'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        loading: false,
    }),

    getters: {
        isAuthenticated: (state) => !!state.user,
    },

    actions: {
        async login(payload) {
            this.loading = true
            try {
                await loginAPI(payload) // sets cookie automatically via backend
                this.user = await getProfile() // fetch user profile after login
            } finally {
                this.loading = false
            }
        },

        actions: {
            async fetchProfile() {
                const token = Cookies.get('token')
                if (!token) return

                try {
                    this.loading = true
                    const data = await getProfile()
                    this.user = data
                } catch (error) {
                    console.error('Failed to fetch profile:', error)
                    this.user = null
                } finally {
                    this.loading = false
                }
            },
        },

        async logout() {
            try {
                await logoutAPI()
            } catch (error) {
                console.warn('Logout failed:', error)
            } finally {
                this.user = null
            }
        },
    },
})
