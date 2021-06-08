import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateBlog, deleteBlog } from '../reducers/blogReducer'

const Blog = ({ blog, loggedUser }) => {
  const dispatch = useDispatch()

  const [visible, setVisible] = useState(false)

  const showWhenVisible = {
    display: visible ? 'none' : '',
    border: '1px solid black',
  }
  const hideWhenVisible = {
    display: visible ? '' : 'none',
    border: '3px dashed lime',
  }

  const toggle = () => {
    setVisible(!visible)
  }

  const addLike = () => {
    const updatedBlog = {
      ...blog,
      likes: (blog.likes += 1),
      user: blog.user._id,
    }
    dispatch(updateBlog(updatedBlog))
  }

  const removeBlog = () => {
    if (window.confirm(`Remove the blog "${blog.title}" by ${blog.author}??`)) {
      dispatch(deleteBlog(blog.id))
    }
  }

  const isOwner = {
    display: blog.user.username === loggedUser.username ? '' : 'none',
  }

  return (
    <div>
      <div style={showWhenVisible} className="blog">
        {blog.title} {blog.author}
        <button onClick={toggle}>show</button>
      </div>
      <div style={hideWhenVisible} className="hiddenAtFirst">
        {blog.title} {blog.author}
        <button onClick={toggle}>hide</button>
        <p>{blog.url}</p>
        <p>
          {blog.likes} <button onClick={addLike}>like</button>
        </p>
        <p>{blog.user.username}</p>
        <button style={isOwner} onClick={removeBlog}>
          remove
        </button>
      </div>
    </div>
  )
}

export default Blog
