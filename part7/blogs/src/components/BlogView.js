import React from 'react'
import { Form, Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router'
import { updateBlog, deleteBlog, addBlogComment } from '../reducers/blogReducer'

const BlogView = () => {
  const id = useParams().id
  const blog = useSelector((state) =>
    state.blogs.find((blog) => blog.id === id)
  )
  const loggedUser = useSelector((state) => state.user)

  const dispatch = useDispatch()

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
  if (blog === undefined) {
    return null
  }

  const isOwner = {
    display: blog.user.username === loggedUser.username ? '' : 'none',
  }

  const addComment = (event) => {
    event.preventDefault()
    const comment = event.target.comment.value
    dispatch(addBlogComment(comment, id))
    event.target.comment.value = ''
  }

  return (
    <div>
      <h1>
        {blog.title} {blog.author}
      </h1>
      <p>
        <a href={blog.url}>{blog.url}</a>
      </p>
      <p>
        {blog.likes} likes{' '}
        <Button onClick={addLike} variant="success">
          like!
        </Button>
      </p>
      <p>added by {blog.user.username}</p>
      <div>
        <h2>Comments</h2>
        <Form onSubmit={addComment}>
          <Form.Group>
            <Form.Control name="comment" />
            <Button style={{ marginTop: 10 }}>add comment</Button>
          </Form.Group>
        </Form>
        <ul>
          {blog.comments.map((comment) => (
            <li key={comment.id}>{comment.content}</li>
          ))}
        </ul>
      </div>
      <Button style={isOwner} onClick={removeBlog}>
        remove
      </Button>
    </div>
  )
}

export default BlogView
