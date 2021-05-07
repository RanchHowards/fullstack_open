const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('../tests/test_helper')

beforeEach(async () => {
    await Blog.deleteMany({})

    for (let blog of helper.blogs) {
        let blogObj = new Blog(blog)
        await blogObj.save()
    }
})
describe('group 1', () => {
    test('check correct amount of blogs', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(6)
        expect(response.header["content-type"]).toEqual("application/json; charset=utf-8")
    })
    test('check _id is id', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body[0].id).toBeDefined()
    })

    test('post a new blog', async () => {
        const newBlog = {
            title: "BLag",
            author: "Bill",
            url: 'string.com',
            likes: 333
        }

        const result = await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)
        const updatedBlogs = await api.get('/api/blogs')


        expect(updatedBlogs.body).toHaveLength(helper.blogs.length + 1)
    })
})
describe('Some bullshit', () => {
    test('check default likes', async () => {
        const newBlog = {
            title: "Farts",
            author: "chimney",
            url: "http://barf.com"
        }

        const response = await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        expect(response.body.likes).toBe(0)

    })

    test('fails with status code 400 if data invaild', async () => {
        const newBlog = {
            author: "BILL",
            title: "Sandwich Kill"
        }

        const result = await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)



        const notesAtEnd = await helper.blogsInDb()

        expect(notesAtEnd).toHaveLength(helper.blogs.length)
    })
})
describe('last two tests', () => {
    test('delete from DB', async () => {
        const blogs = await helper.blogsInDb()

        const blogId = blogs[0].id


        await api.delete(`/api/blogs/${blogId}`).expect(204)
        const updatedBlogs = await helper.blogsInDb()
        expect(updatedBlogs).toHaveLength(helper.blogs.length - 1)

    })

    test('update blog likes', async () => {
        const blogs = await helper.blogsInDb()

        const blog = blogs[2]
        blog.likes += 7777777

        const updatedBlog = await api.put(`/api/blogs/${blog.id}`).send(blog).expect(200).expect('Content-Type', /application\/json/)

        expect(updatedBlog.body.likes).toBe(helper.blogs[2].likes + 7777777)


    })
})
afterAll(() => {

    mongoose.connection.close()

})