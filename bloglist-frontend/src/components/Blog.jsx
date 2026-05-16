import { useState } from 'react'

const Blog = ({ user, blog, incrementLikes, deleteBlog }) => {
  const [showDetails, setShowDetails] = useState(false)

  const simpleView = () => (
    <>
      {blog.title} {blog.author} <button className='button-1' onClick={() => toggleVisibility()}>view</button>
    </>
  )

  const detailedView = () => (
    <>
      <div>
        {blog.title} {blog.author} <button className='button-1' onClick={() => toggleVisibility()}>hide</button>
      </div>
      <div>
        <a href={blog.url}>{blog.url}</a>
      </div>
      <div>
        likes: {blog.likes} <button className='button-1' onClick={() => incrementLikes(blog)}>like</button>
      </div>
      <div>
        {blog.user.username}
      </div>
      <div>
        {showDeleteButton && deleteButton()}
      </div>
    </>
  )

  const deleteButton = () => (
    <button className='button-delete' onClick={() => deleteBlog(blog)}>delete</button>
  )

  const toggleVisibility = () => {
    setShowDetails(!showDetails)
  }

  // const showDeleteButton = blog.user?.username === user?.username
  // Kontrollera om username matchar ELLER om det inkommande user-fältet är den inloggade användarens ID
  const showDeleteButton =
    blog.user?.username === user?.username ||
    blog.user === user?.id ||
    blog.user?.id === user?.id
  return (
    <div className='blogStyle'>
      {showDetails ? detailedView() : simpleView()}
    </div>

  )
}

export default Blog