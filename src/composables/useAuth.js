import { ref } from 'vue'
import axios from 'axios'

const token = ref(localStorage.getItem('token') || '')

const loginWithGitHub = () => {
    window.location.href = 'http://localhost:8080/oauth2/authorization/github'
}

// Handle callback after OAuth2 login
const handleOAuth2Redirect = async () => {
    try {
        const response = await axios.get('http://localhost:8080/api/auth/github/success', { withCredentials: true })
        token.value = response.data.token
        localStorage.setItem('token', token.value)
        return token.value
    } catch (error) {
        console.error(error)
        return null
    }
}

const logout = () => {
    token.value = ''
    localStorage.removeItem('token')
}

export function useAuth() {
    return { token, loginWithGoogle, loginWithGitHub, handleOAuth2Redirect, logout }
}
