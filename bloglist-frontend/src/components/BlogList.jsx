import Blog from './Blog'
import Togglable from './Togglable'
import CreateNewBlog from './CreateNewBlog'

const BlogList = ({ 
  blogs, 
  user, 
  blogRef, 
  handleCreateBlog, 
  incrementLikes, 
  deleteBlog 
}) => {
  return (
    <div>
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
            user={user}
            blog={blog}
            incrementLikes={incrementLikes}
            deleteBlog={deleteBlog}
          />
        ))}
    </div>
  )
}

export default BlogList