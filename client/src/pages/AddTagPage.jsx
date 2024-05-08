import { postTag } from 'src/api'

const AddTagPage = () => {
  const addTag = async (ev) => {
    const { value } = ev.target.tagName

    if (value) {
      const resp = await postTag(value)
      console.log('resp', resp)
    }
  }

  return (
    <form onSubmit={addTag}>
      <input type="text" id="tagName" name="tagName" />
      <button type="submit">Add tag</button>
    </form>
  )
}

export default AddTagPage
