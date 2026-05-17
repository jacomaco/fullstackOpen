const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen'
      }
    })

    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByLabel('username')).toBeVisible()
    await expect(page.getByLabel('password')).toBeVisible()
    await expect(page.getByText('Log in to application')).toBeVisible()
    // ...
  })

  describe('login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'mluukkai', 'salainen')
      await expect(page.getByText('Matti Luukkainen')).toBeVisible()
      await expect(page.getByText(' logged in')).toBeVisible()
      await expect(page.getByRole('button', { name: 'Logout' })).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'mluukkai', 'wrongpassword')
      await expect(page.getByText('Wrong username or password')).toBeVisible()
      await expect(page.getByText('Matti Luukkainen')).not.toBeVisible()
      await expect(page.getByText(' logged in')).not.toBeVisible()
      await expect(page.getByRole('button', { name: 'Logout' })).not.toBeVisible()
    })
  })
  describe('when logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'mluukkai', 'salainen')
    })

    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, {
        title: 'testTitle',
        author: 'testAuthor',
        url: 'testUrl'
      })
      await expect(page.getByText('testTitle testAuthor view')).toBeVisible()
      await expect(page.getByText('a new blog testTitle added')).toBeVisible()
      await expect(page.getByRole('button', { name: 'view' })).toBeVisible()
    })

    test('a blog can be liked', async ({ page }) => {
      await createBlog(page, {
        title: 'testTitle',
        author: 'testAuthor',
        url: 'testUrl'
      })
      const blogDiv = page.locator('.blogStyle').filter({ hasText: 'testTitle' })
      await blogDiv.getByRole('button', { name: /view/i }).click()
      await blogDiv.getByRole('button', { name: /like/i }).click()
      await expect(blogDiv).toContainText('likes: 1')
    })

    test('a user can delete a blogpost', async ({ page }) => {
      await createBlog(page, {
        title: 'testTitle',
        author: 'testAuthor',
        url: 'testUrl',
      })
      const blogDiv = page.locator('.blogStyle').filter({ hasText: 'testTitle' })
      await blogDiv.getByRole('button', { name: /view/i }).click()
      page.on('dialog', async dialog => {
        await dialog.accept()
      })
      await blogDiv.getByRole('button', { name: 'delete' }).click()
      await expect(page.getByText(/testTitle was deleted successfully/i)).toBeVisible()
      await expect(page.getByText('testTitle testAuthor')).not.toBeVisible()
    })

    test('only the user that created a blog can se the blogs delete buttron', async ({ page, request }) => {
      await request.post('/api/users', {
        data: {
          name: 'deleteUser',
          username: 'deleteUsername',
          password: 'deletePassword'
        }
      })
      await createBlog(page, {
        title: 'testTitle',
        author: 'testAuthor',
        url: 'testUrl',
      })

      await page.getByRole('button', { name: /Logout/i }).click()
      await page.reload()
      
      await loginWith(page, 'deleteUsername', 'deletePassword')

      const blogDiv = page.locator('.blogStyle').filter({ hasText: 'testTitle' })
      await blogDiv.getByRole('button', { name: /view/i }).click()

      await expect(blogDiv.getByRole('button', { name: 'delete' })).not.toBeVisible()
    })
  })
})