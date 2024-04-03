export const setStorageItem = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value))
}

export const getStorageItem = (key) => {
  const value = JSON.parse(localStorage.getItem(key))
  return value
}

export const removeStorageItem = (key) => {
  localStorage.removeItem(key)
}
