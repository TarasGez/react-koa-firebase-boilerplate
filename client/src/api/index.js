import axios from 'axios'
import { API_BASE_URL } from 'src/config'
import { TOKEN_STORAGE_KEY } from 'src/assets/constants'
import { getStorageItem } from 'src/helpers/localStorage'

export const api = axios.create({
  baseURL: API_BASE_URL,
})

api.defaults.headers.common['Content-Type'] = 'application/json'

export const postTag = async (tag) => {
  const token = getStorageItem(TOKEN_STORAGE_KEY)
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`

  const response = await api.post('/tag', { tag })
  return response.data
}

export const postBook = async (book) => {
  const token = getStorageItem(TOKEN_STORAGE_KEY)
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`

  const response = await api.post('/book', book)
  return response.data
}

export const authTest = async () => {
  const token = getStorageItem(TOKEN_STORAGE_KEY)

  try {
    const response = await api.post('/auth', { token })
    return response.data
  } catch (error) {
    console.log('error', error)
    throw new Error(error)
  }
}
