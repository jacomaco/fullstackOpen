export default function BlogPost({ blog, user, incrementLikes, deleteBlog }) {
  if (!blog) {
    return <div>Loading BlogPost...</div>
  }
  
  return ( 
    <div>
      <h2>
        {blog.author} {blog.title} 
      </h2>
      <div>
        <a href={blog.url} target="_blank" rel="noreferrer">{blog.url}</a> 
      </div>
      <div>
          likes {blog.likes} {user && (
          <button className="button-1" onClick={() => incrementLikes(blog)}>
              like
          </button>
        )}
      </div>
      <div>
          Added by {blog.user.username}
      </div>
      {blog.user?.username === user?.username && (
        <button className='button-delete' onClick={() => deleteBlog(blog)}>delete</button>
      )}
    </div>
  )
}
