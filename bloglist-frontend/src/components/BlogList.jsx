import Blog from './Blog'
import Togglable from './Togglable'
import CreateNewBlog from './CreateNewBlog'

const BlogList = ({ 
  blogs, 
  user, 
  blogRef, 
  handleCreateBlog, 
}) => {
  return (
    <div>
      <h1>Blogs</h1>
      {user && (
        <Togglable buttonLabel='create new Blog' ref={blogRef}>
          <CreateNewBlog handleCreateBlog={handleCreateBlog} />
        </Togglable>
      )}

      {[...blogs]
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
          />
        ))}
    </div>
  )
}

export default BlogList
