const _ = require('lodash')


const dummy = (blogs) => 1

const totalLikes = (blogs) => {
    return blogs.reduce((acc, curVal) => {
        acc += curVal.likes
        return acc
    }, 0)
}

const favoriteBlog = (blogs) => {
    const favBlog = blogs.reduce((acc, curVal) => {
        if (curVal.likes > acc.likes) { acc = curVal }
        return acc
    })
    const { title, author, likes } = favBlog

    const result = { title, author, likes }
    return result
}

const mostBlogs = (blogs) => {
    _.countBy(blogs, 'author')
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs }