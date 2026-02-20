const _ = require('lodash');

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce(
    (accumulator, currentValue) => accumulator + currentValue.likes,
    0,
  )
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null
  return blogs.reduce((previous, current) => (previous.likes > current.likes) ? previous : current)
}

const mostBlogs = (blogs) => {
  if (_.isEmpty(blogs)) return null

  const topAuthor = _.chain(blogs)
    .countBy('author')
    .map((count, author) => ({ author: author, blogs: count}))
    .maxBy('blogs')
    .value()

  return topAuthor
}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs
} 
