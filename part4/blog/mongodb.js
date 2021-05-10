const Blog = require('./models/blog')
const User = require('./models/user')

const blogs = [
    {

        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,

    },
    {

        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,

    },
    {

        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,

    },
    {

        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,

    },
    {

        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,

    },
    {

        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,

    }
]

users = [{
    name: 'Sam',
    username: "killa",
    password: 'sandwich'
}, {
    name: 'Bill',
    username: "alphaMunk",
    password: 'purple324'
},
{
    name: 'Fandango',
    username: "RapperTTT",
    password: 'a9adsklf'
},
{
    name: 'Alfff',
    username: "Reddd",
    password: 'pass12234'
}]

const seedUsers = async () => {

    await User.deleteMany({})

    for (let user of users) {
        const userObj = new User(user)
        await userObj.save()
    }

    console.log("USERS seeded")

}

const seedBlogs = async () => {
    let users = await getUsers()
    // console.log(users)

    await Blog.deleteMany({})


    let num = 0

    for await (let blog of blogs) {
        const blogObj = new Blog(blog)
        blogObj.user = users[num]._id
        await blogObj.save()

        users[num].blogs.push(blogObj._id)
        await users[num].save()
        num < users.length - 1 ? num++ : num = users.length - 1
    }
    console.log("BLOGS seeded")


}
const getUsers = async () => {
    const userList = await User.find({})
    return userList
}

const seed = async () => {
    await seedUsers()

    await seedBlogs()
}
module.exports = { blogs, seed }