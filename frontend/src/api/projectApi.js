import axiosInstance from './axiosInstance'

export const getAllProjectsApi = async () => {
  const res = await axiosInstance.get('/projects')
  return res.data
}

export const createProjectApi = async (data) => {
  const res = await axiosInstance.post('/projects', data)
  return res.data
}

export const deleteProjectApi = async (id) => {
  await axiosInstance.delete(`/projects/${id}`)
}
