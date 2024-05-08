import { Navigate } from 'react-router-dom'
import { postBook } from 'src/api'
import { AddBookForm } from 'src/components'
import { useUserData } from 'src/hooks'

const AddBookPage = () => {
  const { getUserData } = useUserData()
  const user = getUserData()

  const addBook = async (value) => {
    if (value) {
      const resp = await postBook(value)
      console.log('resp', resp)
    }
  }

  if (!user) {
    return <Navigate to="/" replace />
  }

  return <AddBookForm onSubmit={addBook} />
}

export default AddBookPage
