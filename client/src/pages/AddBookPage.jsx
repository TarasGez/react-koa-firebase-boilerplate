import { postBook } from 'src/api'
import AddBookForm from 'src/components/AddBook/AddBookForm'

const AddBookPage = () => {
  const addBook = async (value) => {
    console.log('value', value)

    if (value) {
      const resp = await postBook(value)
      console.log('resp', resp)
    }
  }

  return <AddBookForm onSubmit={addBook} />
}

export default AddBookPage
