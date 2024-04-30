import { postBook } from 'src/api'
import AddBookForm from './AddBookForm'

const AddBook = () => {
  const addBook = async ({ title, description }) => {
    const resp = await postBook({ title, description })
    console.log('AddBook resp', resp)
  }

  return <AddBookForm onSubmit={addBook} />
}

export default AddBook
