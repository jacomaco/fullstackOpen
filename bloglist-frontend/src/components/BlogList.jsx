import Blog from './Blog'
import { StyledBlogList } from './styles/StyledBlogList.styled'

const BlogList = ({
  blogs,
}) => {
  return (
    <StyledBlogList>
      <h1>Blogs</h1>
      {[...blogs]
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
          />
        ))}
    </StyledBlogList>
  )
}

export default BlogList
