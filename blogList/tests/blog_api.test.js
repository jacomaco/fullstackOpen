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

  const blogsEnd = await helper.blogsInDb()
  assert.strictEqual(blogsEnd.length, helper.initialBlogs.length + 1)

  const titles = blogsEnd.map(n => n.title)
  assert(titles.includes('title1'))
})

test.only('default to 0 if likes property is missing from the request', async () => {
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

  const blogsEnd = await helper.blogsInDb()
  const blogWithoutLikes = blogsEnd.find(blog => blog.title === 'blogWithoutLikes')
  assert.strictEqual(blogWithoutLikes.likes, 0)
})

after(async () => {
  await mongoose.connection.close()
})