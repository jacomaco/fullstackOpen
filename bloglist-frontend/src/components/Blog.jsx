import { useState } from "react"

const Blog = ({ blog }) => {
  const [showDetails, setShowDetails] = useState(false)

  const simpleView = () => (
    <>
      {blog.title} {blog.author} <button onClick={() => toggleVisibility()}>view</button>
    </>
  )

  const detailedView = () => (
    <>
      <div>
        {blog.title} {blog.author} <button onClick={() => toggleVisibility()}>hide</button>
      </div>
      <div>
        <a href={blog.url}>{blog.url}</a>
      </div>
      <div>
        likes {blog.likes} <button>like</button>
      </div>
      <div>{blog.user.username}</div>
    </>
  )

  const toggleVisibility = () => {
    setShowDetails(!showDetails)
  }

  return (
    <div className="blogStyle">
      {showDetails ? detailedView() : simpleView()}
    </div>
  )
}

export default Blog