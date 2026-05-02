import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {

  let blog

  beforeEach(() => {
    blog = {
      title: 'Component testing is done with react-testing-library',
      author: 'Test Author',
      url: 'http://testurl.com',
      likes: 5,
      user: { username: 'testuser', id: '123' }
    }
  })

  it('renders the component displaying the blogs title and author, but does not render its URL or number of likes by default. (5.13)', () => {

    render(<Blog blog={blog} />)

    expect(screen.getByText(/Component testing/i)).toBeVisible()
    expect(screen.getByText(/Test Author/i)).toBeVisible()

    expect(screen.queryByText('http://testurl.com')).toBeNull()
    expect(screen.queryByText(/likes:/i)).toBeNull()
  })

  it('checks that the blogs URL and number of likes are shown when the button controlling the shown details has been clicked. (5.14)', async () => {

    render(<Blog blog={blog} />)

    const user = userEvent.setup()

    const button = screen.getByRole('button', { name: /view/i })
    await user.click(button)

    expect(screen.getByText('http://testurl.com')).toBeVisible()
    expect(screen.getByText(/likes:/i)).toBeVisible()
    expect(screen.getByRole('button', { name: /like/i })).toBeVisible()
  })

  it('ensures that if the like button is clicked twice, the event handler the component received as props is called twice (5.15)', async () => {
    const likeFunction = vi.fn()

    const user = userEvent.setup()

    render(<Blog blog={blog} incrementLikes={likeFunction} />)

    await user.click(screen.getByRole('button', { name: /view/i }))

    const likeButton = screen.getByRole('button', { name: /like/i })

    await user.click(likeButton)
    await user.click(likeButton)

    expect(likeFunction).toHaveBeenCalledTimes(2)
  })
})
