import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogPost from '../components/BlogPost'

describe('<BlogPost />', () => {
  let blog

  beforeEach(() => {
    blog = {
      title: 'React Router is awesome',
      author: 'Router Expert',
      url: 'http://routertest.com',
      likes: 12,
      user: { 
        username: 'blogcreator', 
        name: 'The Creator',
        id: '123' 
      }
    }
  })

  it('displays blog info and likes to unauthenticated users, but no buttons', () => {
    render(<BlogPost blog={blog} user={null} />)

    expect(screen.getByText(/React Router is awesome/i)).toBeVisible()
    expect(screen.getByText(/Router Expert/i)).toBeVisible()
    expect(screen.getByText(/http:\/\/routertest.com/i)).toBeVisible()
    expect(screen.getByText(/likes 12/i)).toBeVisible()

    expect(screen.queryByRole('button', { name: /like/i })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /delete/i })).not.toBeInTheDocument()
  })

  it('displays only the like button for authenticated users who are not the creator', () => {
    const loggedInUser = { username: 'regularuser', id: '456' }
    render(<BlogPost blog={blog} user={loggedInUser} />)

    expect(screen.getByRole('button', { name: /like/i })).toBeVisible()
    expect(screen.queryByRole('button', { name: /delete/i })).not.toBeInTheDocument()
  })

  it('displays both the like and delete button for the creator of the blog', () => {
    const creator = { username: 'blogcreator', id: '123' }
    render(<BlogPost blog={blog} user={creator} />)

    expect(screen.getByRole('button', { name: /like/i })).toBeVisible()
    expect(screen.queryByRole('button', { name: /delete/i })).toBeVisible()
  })

  it('calls the incrementLikes handler when the like button is clicked', async () => {
    const mockLikeHandler = vi.fn()
    const regularUser = { username: 'regularuser', id: '456' }
    const user = userEvent.setup()

    render(<BlogPost blog={blog} user={regularUser} incrementLikes={mockLikeHandler} />)

    const likeButton = screen.getByRole('button', { name: /like/i })
    await user.click(likeButton)

    expect(mockLikeHandler).toHaveBeenCalledTimes(1)
  })
})