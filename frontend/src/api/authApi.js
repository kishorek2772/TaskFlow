import axiosInstance from './axiosInstance'

export const loginApi = async (data) => {
  const res = await axiosInstance.post('/auth/login', data)
  return res.data
}

export const registerApi = async (data) => {
  const res = await axiosInstance.post('/auth/register', data)
  return res.data
}

export const logoutApi = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
}
