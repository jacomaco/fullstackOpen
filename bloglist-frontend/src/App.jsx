import { useState, useEffect } from 'react'
import { Routes, Route, Link, useNavigate, useMatch } from 'react-router-dom'

import blogService from './services/blogs'
import loginService from './services/login'

import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import BlogPost from './components/BlogPost'
import CreateNewBlog from './components/CreateNewBlog'
import GlobalStyles from './components/styles/Global.styled'
import { Container } from './components/styles/Container.styled'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({ message: null, type: null })

  const navigate = useNavigate()

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
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
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogappuser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      navigate('/')
    } catch {
      setNotification({ message: 'Wrong username or password', type: 'error' })
      setTimeout(() => setNotification({ message: null, type: null }), 5000)
    }
  }

  const handleCreateBlog = async (blogObject) => {
    try {
      const returnedBlog = await blogService.createBlog(blogObject)
      setBlogs([...blogs, returnedBlog])
      setNotification({
        message: `a new blog ${blogObject.title} added`,
        type: 'success',
      })
      navigate('/')
      setTimeout(() => setNotification({ message: null, type: null }), 5000)
    } catch {
      setNotification({ message: 'A new blog was not created', type: 'error' })
      setTimeout(() => setNotification({ message: null, type: null }), 5000)
    }
  }

  const handleDeleteBlog = async (blogObject) => {
    if (window.confirm(`Remove blog ${blogObject.title} by ${blogObject.author}?`)) {
      try {
        await blogService.deleteBlog(blogObject)
        setBlogs(blogs.filter((blog) => blog.id !== blogObject.id))
        setNotification({
          message: `${blogObject.title} was deleted successfully`,
          type: 'success',
        })
        navigate('/')
        setTimeout(() => setNotification({ message: null, type: null }), 5000)
      } catch (error) {
        if (error.response && error.response.status === 401) {
          setNotification({ message: 'Session expired, please log in again', type: 'error' })
          handleLogout()
        } else {
          setNotification({ message: `${blogObject.title} was not deleted`, type: 'error' })
        }
        setTimeout(() => setNotification({ message: null, type: null }), 5000)
      }
    }
  }

  const incrementLikes = async (blogObject) => {
    const incrementedBlog = {
      ...blogObject,
      likes: blogObject.likes + 1,
      user: blogObject.user.id,
    }
    try {
      const returnedBlog = await blogService.update(incrementedBlog)
      setBlogs(blogs.map((blog) => (blog.id !== blogObject.id ? blog : returnedBlog)))
    } catch {
      setNotification({ message: 'Likes was not updated', type: 'error' })
      setTimeout(() => setNotification({ message: null, type: null }), 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappuser')
    setUser(null)
    blogService.setToken(null)
    navigate('/')
  }

  const match = useMatch('/blogs/:id')

  const blog = match
    ? blogs.find(blog => blog.id === match.params.id)
    : null

  const padding = { padding: 5 }

  return (
    <div>
      <GlobalStyles />
      {/* Navigation */}
      <div style={padding}>
        <Link style={padding} to="/">blogs</Link>
        {user && <Link style={padding} to="/create">new blog</Link>}
        {user ? (
          <span style={padding}>
            {user.name} logged in{' '}
            <button className='button-1' type='button' onClick={handleLogout}>Logout</button>
          </span>
        ) : (
          <Link style={padding} to="/login">login</Link>
        )}
      </div>

      <Container>
        <Notification message={notification.message} type={notification.type} />

        <Routes>
          <Route path="/create" element={
            <CreateNewBlog handleCreateBlog={handleCreateBlog}
            />
          } />

          <Route path="/blogs/:id" element={
            <BlogPost
              blog={blog}
              user={user}
              incrementLikes={incrementLikes}
              deleteBlog={handleDeleteBlog}
            />
          } />

          <Route path="/" element={
            <BlogList
              blogs={blogs}
            />
          } />

          <Route path="/login" element={
            <LoginForm
              handleLogin={handleLogin}
              username={username}
              password={password}
              setUsername={setUsername}
              setPassword={setPassword}
            />
          } />
        </Routes>
      </Container>
    </div>
  )
}

export default App
