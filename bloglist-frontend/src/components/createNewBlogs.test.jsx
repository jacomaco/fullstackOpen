import { render, screen } from '@testing-library/react'
import CreateNewBlog from './CreateNewBlog' 
import { expect, vi } from 'vitest'
import userEvent from '@testing-library/user-event'

it('checks, that the form calls the event handler it received as props with the right details when a new blog is created (5.16)', async () => {
  const createFormMock = vi.fn()

  const user = userEvent.setup()

  render(<CreateNewBlog handleCreateBlog={createFormMock}/>)

  await user.type(screen.getByPlaceholderText(/title/i), 'testTitle')
  await user.type(screen.getByPlaceholderText(/author/i), 'testAuthor')
  await user.type(screen.getByPlaceholderText(/url/i), 'https://testUrl.com')

  await user.click(screen.getByRole('button', { name: /create/i }))

  expect(createFormMock).toHaveBeenCalledWith({
    title: 'testTitle',
    author: 'testAuthor',
    url: 'https://testUrl.com'
  })
})