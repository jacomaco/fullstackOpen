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
        <div>
          title: <input type='text' value={title} onChange={({ target }) => setTitle(target.value)} />
        </div>
        <div>
          author: <input type='text' value={author} onChange={({ target }) => setAuthor(target.value)} />
        </div>
        <div>
          url: <input type='text' value={url} onChange={({ target }) => setUrl(target.value)} />
        </div>
        <button type='submit' className='button-1'>create</button>
      </form>
    </div>
  )
}

export default CreateNewBlog