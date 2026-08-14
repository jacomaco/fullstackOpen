import { StyledBlogPost } from './styles/BlogPost.styled'
import { Button } from './styles/Button.styled'

export default function BlogPost({ blog, user, incrementLikes, deleteBlog }) {
  if (!blog) {
    return <div>Loading BlogPost...</div>
  }

  return (
    <StyledBlogPost>
      <h2>
        {blog.title}
      </h2>
      <h3>
        by {blog.author}
      </h3>
      <div>
        <a href={blog.url} target="_blank" rel="noreferrer">{blog.url}</a>
      </div>
      <div>
        Added by {blog.user.username}
      </div>
      <div className="actions">
        {user && (
          <>
            <span>{blog.likes} likes</span>
            <Button $primary={true} onClick={() => incrementLikes(blog)}>
              like
            </Button>
          </>
        )}
        {(blog.user?.username === user?.username || blog.user === user?.id || blog.user?.id === user?.id) && (
          <Button onClick={() => deleteBlog(blog)}>delete</Button>
        )}
      </div>
    </StyledBlogPost>
  )
}
