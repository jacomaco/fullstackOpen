import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import { expect } from 'vitest'

describe('5.13', () => {

  it('renders the component displaying the blogs title and author, but does not render its URL or number of likes by default.', () => {
    const blog = {
      title: 'Component testing is done with react-testing-library',
      author: 'Test Author',
      url: 'http://testurl.com',
      likes: 5,
      user: { username: 'testuser', id: '123' }
    }

    render(<Blog blog={blog} />)

    expect(screen.getByText(/Component testing/i)).toBeVisible()
    expect(screen.getByText(/Test Author/i)).toBeVisible()

    expect(screen.queryByText('http://testurl.com')).toBeNull()
    expect(screen.queryByText(/likes:/i)).toBeNull()
  })
})

describe('5.14', () => {
  it('checks that the blogs URL and number of likes are shown when the button controlling the shown details has been clicked.', async () => {
    const blog = {
      title: 'Component testing is done with react-testing-library',
      author: 'Test Author',
      url: 'http://testurl.com',
      likes: 5,
      user: { username: 'testuser', id: '123' }
    }

    render(<Blog blog={blog} />)

    const user = userEvent.setup()
    
    const button = screen.getByRole('button', { name: /view/i })
    await user.click(button)

    expect(screen.getByText('http://testurl.com')).toBeVisible()
    expect(screen.getByText(/likes:/i)).toBeVisible()
    expect(screen.getByRole('button', { name: /like/i })).toBeVisible()
  })
})