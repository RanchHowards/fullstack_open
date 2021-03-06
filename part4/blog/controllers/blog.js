const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const Comments = require('../models/comments')
const jwt = require('jsonwebtoken')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
    .populate('user', { user: 1, username: 1 })
    .populate('comments')
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const { title, author, url, likes } = request.body

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = request.user

  const blog = {
    title,
    author,
    url,
    likes,
    user: user._id,
  }

  const blogObj = new Blog(blog)
  const result = await blogObj.save()
  user.blogs = user.blogs.concat(blogObj._id)
  await user.save()
  response.json(result.toJSON())
})

blogRouter.put('/:id', async (req, res) => {
  const update = await Blog.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  }).populate('user', { user: 1, username: 1 })

  res.json(update.toJSON())
})

blogRouter.delete('/:id', async (request, response) => {
  const id = request.params.id
  const blog = await Blog.findById(id)

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  } else if (blog.user.toString() === decodedToken.id.toString()) {
    await Blog.findByIdAndRemove(id)
    response.status(204).end()
  } else response.status(401).json({ error: 'not authorized' })
})

blogRouter.post('/:id/comments', async (request, response) => {
  const { comment } = request.body
  const id = request.params.id
  const blog = await Blog.findById(id)

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const commentObj = new Comments(request.body)
  await commentObj.save()
  console.log('commOBJ', commentObj._id)
  blog.comments.push(commentObj._id)
  console.log('BLOG', blog)
  await blog.save()
  const result = await blog
    .populate('user', { user: 1, username: 1 })
    .populate('comments')
    .execPopulate()
  console.log('BACKEND', result)
  response.json(result.toJSON())
})

module.exports = blogRouter
