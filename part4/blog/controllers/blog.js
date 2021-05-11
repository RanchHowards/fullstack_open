const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

// const getTokenFrom = request => {
//     const authorization = request.get('authorization')
//     if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
//         return authorization.substring(7)
//     }
//     return null
// }

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { user: 1, username: 1 })
    response.json(blogs)
})


blogRouter.post('/', async (request, response) => {

    const { title, author, url, likes } = request.body

    // const token = getTokenFrom(request)
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)

    const blog = {
        title,
        author,
        url,
        likes,
        user: user._id
    }

    const blogObj = new Blog(blog)
    const result = await blogObj.save()
    user.blogs = user.blogs.concat(blogObj._id)
    await user.save()
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