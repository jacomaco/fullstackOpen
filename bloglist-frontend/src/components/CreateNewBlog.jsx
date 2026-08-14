import { useState } from 'react'
import { FormCreate } from './styles/FormCreate.styled'
import { Button } from './styles/Button.styled'
import { StyledCreateNewBlog } from './styles/StyledCreateNewBlog.styled'

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
    <StyledCreateNewBlog>
      <h2>Create New</h2>
      <FormCreate onSubmit={addBlog}>
        <label>
          <input
            placeholder='title'
            name='title'
            type='text' value={title}
            onChange={({ target }) => setTitle(target.value)} />
        </label>
        <label>
          <input
            placeholder='author'
            name='author'
            type='text'
            value={author}
            onChange={({ target }) => setAuthor(target.value)} />
        </label>
        <label>
          <input
            placeholder='url'
            name='url'
            type='text'
            value={url}
            onChange={({ target }) => setUrl(target.value)} />
        </label>
        <Button $primary>CREATE</Button>
      </FormCreate>
    </StyledCreateNewBlog>
  )
}

export default CreateNewBlog
