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
    await page.getByText('login').click()
    await expect(page.getByLabel('username')).toBeVisible()
    await expect(page.getByLabel('password')).toBeVisible()
    await expect(page.getByText('Log in to application')).toBeVisible()
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
      await expect(page.getByText('testTitle testAuthor')).toBeVisible()
      await expect(page.getByText('a new blog testTitle added')).toBeVisible()
    })

    test('a blog can be liked', async ({ page }) => {
      await createBlog(page, {
        title: 'testTitle',
        author: 'testAuthor',
        url: 'testUrl'
      })
      await page.getByRole('link', { name: /testTitle testAuthor/i }).click()
      await page.getByRole('button', { name: /like/i }).click()
      await expect(page.getByText( /likes 1/i)).toBeVisible()
    })

    test('a user can delete a blogpost', async ({ page }) => {
      await createBlog(page, {
        title: 'testTitle',
        author: 'testAuthor',
        url: 'testUrl',
      })
      await page.getByRole('link', { name: /testTitle testAuthor/i }).click()
      
      page.on('dialog', async dialog => {
        await dialog.accept()
      })
      
      await page.getByRole('button', { name: 'delete', exact: false }).click()

      await expect(page.getByText(/testTitle was deleted successfully/i)).toBeVisible()
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

      await page.getByRole('link', { name: 'testTitle testAuthor' }).click()
      await expect(page.getByRole('button', { name: /delete/i })).not.toBeVisible()
    })

    test.skip('the blogposts should be sorted by numer of likes in decending order', async ({ page }) => { // not nessesary for 5.28
      const numberOfBlogs = 3
      for (let i = 1; i <= numberOfBlogs; i++) {
        await createBlog(page, { title: `title${i}`, author: `author${i}`, url: `url${i}` })
      }

      for (let i = 1; i <= numberOfBlogs; i++) {
        const blogDiv = page.locator('.blogStyle').filter({ hasText: `title${i}` })
        await blogDiv.getByRole('button', { name: /view/i }).click()
      }

      for (let i = 1; i <= numberOfBlogs; i++) {
        const blogDiv = page.locator('.blogStyle').filter({ hasText: `title${i}` })
        for (let j = 0; j < i; j++) {
          await blogDiv.getByRole('button', { name: /like/i }).click()
          await expect(blogDiv).toContainText(`likes: ${j + 1}`)
        }
      }

      const blogDivs = page.locator('.blogStyle')
      await expect(blogDivs.nth(0)).toContainText('title3')
      await expect(blogDivs.nth(1)).toContainText('title2')
      await expect(blogDivs.nth(2)).toContainText('title1')
    })
  })
})