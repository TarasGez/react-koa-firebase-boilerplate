import axios from 'axios'
import { API_BASE_URL } from 'src/config'
import { TOKEN_STORAGE_KEY } from 'src/assets/constants'
import { getStorageItem } from 'src/helpers/localStorage'

export const api = axios.create({
  baseURL: API_BASE_URL,
})

api.defaults.headers.common['Content-Type'] = 'application/json'

export const rootGet = async () => {
  const response = await api.get('/')
  return response.data
}

export const postTags = async (tagList) => {
  const token = getStorageItem(TOKEN_STORAGE_KEY)
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`

  const response = await api.post('/tags', { tagList })
  return response.data
}

export const authTest = async () => {
  const token = getStorageItem(TOKEN_STORAGE_KEY)

  const response = await api.post('/auth', { token })
  return response.data
}
