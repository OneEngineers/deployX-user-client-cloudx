import request from '@/utils/request'

export const fetchApps = () => request.get('/apps')
export const createApp = data => request.post('/apps', data)
export const deleteApp = id => request.delete(`/apps/${id}`)
