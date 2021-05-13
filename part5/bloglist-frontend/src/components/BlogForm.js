import React, { useState } from 'react'

const BlogForm = ({ handleAuthor, handleTitle, handleUrl, postBlog }) => {
    const [title, setTitle] = useState('')
    const [url, setUrl] = useState('')
    const [author, setAuthor] = useState('')


    const addBlog = (event) => {
        event.preventDefault()
        const newBlog = { title, author, url }

        postBlog(newBlog)

        setTitle('')
        setUrl('')
        setAuthor("")
    }


    return (


        <div>
            <h2>create new</h2>
            <form onSubmit={addBlog}>
                <div>title<input
                    value={title}
                    name="title"
                    type="text"
                    onChange={({ target }) => setTitle(target.value)}
                />
                </div>
                <div>author<input
                    value={author}
                    name="author"
                    type="text"
                    onChange={({ target }) => setAuthor(target.value)}
                />
                </div>
                <div>url<input
                    value={url}
                    name="url"
                    type="url"
                    onChange={({ target }) => setUrl(target.value)}
                />
                </div>
                <button>create</button>
            </form>
        </div>
    )
}

export default BlogForm