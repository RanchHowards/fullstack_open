const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('../tests/test_helper')

beforeEach(async () => {
    await User.deleteMany({})

    for (let user of helper.users) {
        let userObj = new User(user)
        await userObj.save()
    }
})

// test('checking test', async () => {

//     result = await helper.usersInDb()
//     expect(result).toHaveLength(4)
// })

describe('user tests', () => {
    test('add user', async () => {
        const user = {
            name: "tang",
            username: 'tron',
            password: 'sikdkdk'
        }

        await api
            .post('/api/users')
            .send(user)
            .expect(200)

        const updatedUsers = await api.get('/api/users')
        expect(updatedUsers.body).toHaveLength(helper.users.length + 1)
    })
    test('validate user Password', async () => {
        const newUser = {
            name: "Supple",
            username: "trainBoy",
            password: "33"
        }

        await api.post('/api/users').send(newUser).expect(400)
        const updatedUsers = await api.get('/api/users')
        expect(updatedUsers.body).toHaveLength(helper.users.length)
    })
    test('validate username', async () => {
        const newUser = {
            name: "Su",
            username: "triplle",
            password: "38jfjfjf"
        }

        await api.post('/api/users').send(newUser).expect(400)
        const currentUsers = await api.get('/api/users')
        expect(currentUsers.body).toHaveLength(helper.users.length)
    })
})
afterAll(() => {

    mongoose.connection.close()

})