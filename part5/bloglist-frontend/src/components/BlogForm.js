import React from 'react'

const BlogForm = ({ title, author, url, handleAuthor, handleTitle, handleUrl, postBlog }) => (
    <div>
        <h2>create new</h2>
        <form onSubmit={postBlog}>
            <div>title<input
                value={title}
                name="title"
                type="text"
                onChange={handleTitle}
            />
            </div>
            <div>author<input
                value={author}
                name="author"
                type="text"
                onChange={handleAuthor}
            />
            </div>
            <div>url<input
                value={url}
                name="url"
                type="url"
                onChange={handleUrl}
            />
            </div>
            <button>create</button>
        </form>
    </div>
)

export default BlogForm