import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import CreateNewBlog from './components/CreateNewBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({ message: null, type: null })

  const blogRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappuser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password) // might want to remove for production apps
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem(
        'loggedBlogappuser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch {
      setNotification({
        message: 'Wrong username or password',
        type: 'error',
      })
      setTimeout(() => {
        setNotification({ message: null, type: null })
      }, 5000)
    }
  }

  const handleCreateBlog = async (blogObject) => {
    try {
      const returnedBlog = await blogService.createBlog(blogObject)
      blogRef.current.toggleVisibility()
      setBlogs([...blogs, returnedBlog])
      setNotification({
        message: `a new blog ${blogObject.title} added`,
        type: 'success'
      })
      setTimeout(() => {
        setNotification({ message: null, type: null })
      }, 5000)
    } catch {
      setNotification({
        message: 'A new blog was not created',
        type: 'error'
      })
      setTimeout(() => {
        setNotification({ message: null, type: null })
      }, 5000)
    }
  }

  const handleDeleteBlog = async (blogObject) => {
    if (window.confirm(`Remove blog ${blogObject.title} by ${blogObject.author}?`)) {
      try {
        await blogService.deleteBlog(blogObject)
        setBlogs(blogs.filter(blog => blog.id !== blogObject.id))
        setNotification({
          message: `${blogObject.title} was deleted successfully`,
          type: 'success'
        })
        setTimeout(() => {
          setNotification({ message: null, type: null })
        }, 5000)
      } catch (error) {
        if (error.response && error.response.status === 401) {
          setNotification({ message: 'Session expired, please log in again', type: 'error' })
          handleLogout()
        } else {
          setNotification({
            message: `${blogObject.title} was not deleted`,
            type: 'error'
          })
        }
        setTimeout(() => {
          setNotification({ message: null, type: null })
        }, 5000)
      }
    }

  }

  const incrementLikes = async (blogObject) => {
    const incrementedBlog = {
      ...blogObject,
      likes: blogObject.likes + 1,
      user: blogObject.user.id
    }

    try {
      const returnedBlog = await blogService.update(incrementedBlog)
      setBlogs(blogs.map(blog => blog.id !== blogObject.id ? blog : returnedBlog))
    } catch {
      setNotification({
        message: 'Likes was not updated',
        type: 'error'
      })
      setTimeout(() => {
        setNotification({ message: null, type: null })
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappuser')
    setUser(null)
    blogService.setToken(null)
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={notification.message} type={notification.type} />
        <form onSubmit={handleLogin}>
          <div>
            <label>
              username
              <input
                type="text"
                value={username}
                onChange={({ target }) => setUsername(target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              password
              <input
                type="password"
                value={password}
                onChange={({ target }) => setPassword(target.value)} />
            </label>
          </div>
          <button className='button-1' type="submit">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notification.message} type={notification.type} />
      <p>{user.name} logged in<button className='button-1' onClick={handleLogout}>Logout</button></p>
      <Togglable buttonLabel={'create new Blog'} ref={blogRef}>
        <CreateNewBlog handleCreateBlog={handleCreateBlog} />
      </Togglable>
      {[...blogs].sort((a, b) => b.likes - a.likes).map(blog =>
        <Blog key={blog.id} user={user} blog={blog} incrementLikes={incrementLikes} deleteBlog={handleDeleteBlog} />
      )}

    </div>
  )
}

export default App