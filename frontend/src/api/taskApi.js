import axiosInstance from './axiosInstance'

export const getAllTasksApi = async (projectId) => {
  const res = await axiosInstance.get(`/tasks?projectId=${projectId}`)
  return res.data
}

export const createTaskApi = async (data) => {
  const res = await axiosInstance.post('/tasks', data)
  return res.data
}

export const updateTaskStatusApi = async (id, status) => {
  const res = await axiosInstance.patch(`/tasks/${id}/status`, { status })
  return res.data
}

export const deleteTaskApi = async (id) => {
  await axiosInstance.delete(`/tasks/${id}`)
}
