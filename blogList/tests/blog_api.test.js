const assert = require('node:assert')
const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs/')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs/')
  assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('unique identifier is named id', async () => {
  const response = await api
    .get('/api/blogs')

  const firstBlog = response.body[0]

  assert.strictEqual(typeof firstBlog.id, 'string')
  assert.strictEqual(firstBlog._id, undefined)
})

test('post request successfully creates a new blog post', async () => {
  const newBlog = {
    title: "title1",
    author: "author1",
    url: "url1",
    likes: 1
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

  const titles = blogsAtEnd.map(n => n.title)
  assert(titles.includes('title1'))
})

test('default to 0 if likes property is missing from the request', async () => {
  const newBlog = {
    title: "blogWithoutLikes",
    author: "author2",
    url: "url2",
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  const blogWithoutLikes = blogsAtEnd.find(blog => blog.title === 'blogWithoutLikes')
  assert.strictEqual(blogWithoutLikes.likes, 0)
})

test('request status code is 400 if title are missing from the request data', async () => {
  const newBlogWithoutTitle = {
    author: 'author3',
    url: 'url3'
  }

  await api
    .post('/api/blogs')
    .send(newBlogWithoutTitle)
    .expect(400)
    .expect('Content-Type', /application\/json/)

})

test('request status code is 400 if url are missing from the request data', async () => {
  const newBlogWithoutUrl = {
    title: 'title4',
    author: 'author 4'
  }

  await api
    .post('/api/blogs')
    .send(newBlogWithoutUrl)
    .expect(400)
    .expect('Content-Type', /application\/json/)
})

test('deleteing a single blog post is successfull', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()
  assert(!(blogsAtEnd.find(blog => blog.id === blogToDelete.id)))
  assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1)
})

test('updating likes in a blog post is successful', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToUpdate = blogsAtStart[0]

  const newLikes = {
    likes: blogToUpdate.likes + 1
  }

  const response = await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(newLikes)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(response.body.likes, blogToUpdate.likes + 1)

  const blogsAtEnd = await helper.blogsInDb()
  const updatedBlog = blogsAtEnd.find(blog => blog.id === blogToUpdate.id)

  assert.strictEqual(updatedBlog.likes, blogToUpdate.likes + 1)
  assert.strictEqual(blogsAtStart.length, blogsAtEnd.length)
})

after(async () => {
  await mongoose.connection.close()
})