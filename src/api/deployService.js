import request from '@/utils/request'

export const getDeployments = () => request.get('/deployments')
export const triggerDeployment = (appId) => request.post(`/deploy/${appId}`)
export const getLogs = (id) => request.get(`/deploy/${id}/logs`)
