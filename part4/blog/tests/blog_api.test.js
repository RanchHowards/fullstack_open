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
describe('group 0', () => {
    let headers
    beforeEach(async () => {
        const user = {
            name: "BILL",
            username: "billthepill",
            password: "password"
        }
        await api
            .post('/api/users')
            .send(user)

        const result = await api
            .post('/api/login')
            .send(user)

        headers = { 'Authorization': `bearer ${result.body.token}` }
    })
    describe("group 1", () => {
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

            await api
                .post('/api/blogs')
                .send(newBlog)
                .set(headers)
                .expect(200)
                .expect('Content-Type', /application\/json/)
            const updatedBlogs = await api.get('/api/blogs')


            expect(updatedBlogs.body).toHaveLength(helper.blogs.length + 1)
        })


        test('check default likes', async () => {
            const newBlog = {
                title: "Farts",
                author: "chimney",
                url: "http://barf.com"
            }

            const response = await api
                .post('/api/blogs')
                .send(newBlog)
                .set(headers)
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
                .set(headers)
                .expect(400)



            const notesAtEnd = await helper.blogsInDb()

            expect(notesAtEnd).toHaveLength(helper.blogs.length)
        })
    })
    describe('last two tests', () => {
        let result
        beforeEach(async () => {
            const newBlog = {
                title: "Chip Daniels World",
                author: "CD",
                url: "chipdaniels.com",
                likes: 666
            }

            result = await api
                .post('/api/blogs')
                .send(newBlog)
                .set(headers)


        })
        test('delete from DB', async () => {

            const initialBlogs = await helper.blogsInDb()

            await api
                .delete(`/api/blogs/${result.body.id}`)
                .set(headers)
                .expect(204)

            const blogsAtEnd = await helper.blogsInDb()
            expect(initialBlogs).toHaveLength(blogsAtEnd.length + 1)

        })

        test('update blog likes', async () => {
            const blogs = await helper.blogsInDb()

            const blog = { ...result.body, likes: result.body.likes + 1 }
            const updatedBlog = await api
                .put(`/api/blogs/${result.body.id}`)
                .send(blog)
                .set(headers)
                .expect(200)
                .expect('Content-Type', /application\/json/)

            const blogsAtEnd = await helper.blogsInDb()
            const edited = blogsAtEnd.find(b => b.url === blog.url)
            expect(updatedBlog.body.likes).toBe(edited.likes)


        })
    })
})





afterAll(() => {

    mongoose.connection.close()

})