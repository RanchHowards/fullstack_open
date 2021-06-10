import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

const BlogForm = ({ postBlog }) => {
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [author, setAuthor] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    const newBlog = { title, author, url }

    postBlog(newBlog)

    setTitle('')
    setUrl('')
    setAuthor('')
  }

  return (
    <div>
      <h2>create new</h2>
      <Form onSubmit={addBlog}>
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control
            value={title}
            name="title"
            id="title"
            type="text"
            onChange={({ target }) => setTitle(target.value)}
          />
          <Form.Label>author</Form.Label>
          <Form.Control
            value={author}
            name="author"
            id="author"
            type="text"
            onChange={({ target }) => setAuthor(target.value)}
          />
          <Form.Label>url</Form.Label>
          <Form.Control
            value={url}
            name="url"
            id="url"
            type="url"
            onChange={({ target }) => setUrl(target.value)}
          />
          <Button id="submitBlog" type="submit">
            create
          </Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default BlogForm
