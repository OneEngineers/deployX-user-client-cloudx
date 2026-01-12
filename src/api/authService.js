import axiosInstance from './axiosInstance'
import Cookies from 'js-cookie'

// Full-page redirect to GitHub OAuth login
export const loginWithGitHub = () => {
    window.location.href = 'https://cloudx-backend.domrey.online/oauth2/authorization/github'
}

// Handle OAuth callback: backend returns JWT (stored in HttpOnly cookie or in JS-accessible cookie)
export const handleOAuthCallback = async () => {
    try {
        const response = await axiosInstance.get('/api/auth/github/success', {
            withCredentials: true, // send cookies if backend sets them
        })

        const { token, user } = response.data

        if (token) {
            // Store JWT in cookie (7 days)
            Cookies.set('token', token, { expires: 7, path: '/' })
        }

        return user
    } catch (error) {
        console.error('OAuth callback error:', error)
        return null
    }
}

// Fetch profile using cookie or JWT
export const getProfile = async () => {
    const token = Cookies.get('token') // optional if backend uses HttpOnly cookie
    const response = await axiosInstance.get('/api/profile', {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        withCredentials: true,
    })
    return response.data
}

// Login with email/password
export const loginAPI = (payload) => axiosInstance.post('/api/login', payload, { withCredentials: true })

// Logout
export const logoutAPI = async () => {
    await axiosInstance.post('/api/logout', {}, { withCredentials: true })
    Cookies.remove('token')
}
