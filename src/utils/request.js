import axios from 'axios'
import { getToken } from './auth'

const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'https://cloudx-backend.domrey.online/api',
    timeout: 10000
})

instance.interceptors.request.use(config => {
    const token = getToken()
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
})

export default instance
