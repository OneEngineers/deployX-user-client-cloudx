import request from '@/utils/request'

export const fetchUsers = () => request.get('/users')
export const updateUserRole = (id, role) => request.put(`/users/${id}`, { role })

export const getUsers = async () => {
    const response = await axiosInstance.get('/api/users')
    return response.data
}