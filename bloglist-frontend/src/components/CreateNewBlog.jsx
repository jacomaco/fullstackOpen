import { useState } from 'react'
import { FormCreate } from './styles/FormCreate.styled'
import { Button } from './styles/Button.styled'

const CreateNewBlog = ({ handleCreateBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = async event => {
    event.preventDefault()
    handleCreateBlog({ title, author, url })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>Create New</h2>
      <FormCreate onSubmit={addBlog}>
        <label>
          <input
            placeholder='title'
            type='text' value={title}
            onChange={({ target }) => setTitle(target.value)} />
        </label>
        <label>
          <input
            placeholder='author'
            type='text'
            value={author}
            onChange={({ target }) => setAuthor(target.value)} />
        </label>
        <label>
          <input
            placeholder='url'
            type='text'
            value={url}
            onChange={({ target }) => setUrl(target.value)} />
        </label>
        <Button $primary>CREATE</Button>
      </FormCreate>
    </div>
  )
}

export default CreateNewBlog