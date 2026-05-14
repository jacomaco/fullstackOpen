import { useState } from 'react'

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
      <form onSubmit={addBlog}>
        <label>
          title
          <input
            placeholder='title'
            type='text' value={title}
            onChange={({ target }) => setTitle(target.value)} />
        </label><br/>
        <label>
          author
          <input
            placeholder='author'
            type='text'
            value={author}
            onChange={({ target }) => setAuthor(target.value)} />
        </label><br/>
        <label>
          url
          <input
            placeholder='url'
            type='text'
            value={url}
            onChange={({ target }) => setUrl(target.value)} />
        </label><br/>
        <button type='submit' className='button-1'>create</button>
      </form>
    </div>
  )
}

export default CreateNewBlog