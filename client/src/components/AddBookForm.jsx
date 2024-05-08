const AddBookForm = ({ onSubmit }) => {
  const handleSubmit = async (ev) => {
    ev.preventDefault()
    const { bookTitle, bookDesc } = ev.target

    const title = bookTitle.value
    const description = bookDesc.value

    if (title) {
      onSubmit({ title, description })
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" id="bookTitle" name="bookTitle" />
      <input type="text" id="bookDesc" name="bookDesc" />
      <button type="submit">Add book</button>
    </form>
  )
}

export default AddBookForm
