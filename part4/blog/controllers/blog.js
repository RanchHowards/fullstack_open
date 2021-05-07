const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})


blogRouter.post('/', async (request, response) => {
    const { title, author, url, likes } = request.body

    const blog = {
        title,
        author,
        url,
        likes
    }

    const blogObj = new Blog(blog)
    const result = await blogObj.save()
    response.json(result.toJSON())

})

blogRouter.put('/:id', async (req, res) => {

    const update = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(update.toJSON())

})

blogRouter.delete('/:id', async (req, res) => {
    const id = req.params.id
    await Blog.findByIdAndRemove(id)
    res.status(204).end()

})

module.exports = blogRouter