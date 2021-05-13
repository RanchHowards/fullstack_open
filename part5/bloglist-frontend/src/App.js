import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [author, setAuthor] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const storedUser = window.localStorage.getItem('loggedUser')
    if (storedUser) {
      const user = JSON.parse(storedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      setUser(user)
      setNotify(`successfully logged in ${user.username}`, "success")
      setPassword('')
      setUsername('')
      blogService.setToken(user.token)
    }
    catch (error) {
      setNotify(error.response.data.error, "error")
    }
  }

  const loginForm = () => (
    <div>
      <h1>log in to the app</h1>
      <form onSubmit={handleLogin}>
        <div>username
           <input
            type="text"
            name="username"
            value={username}
            onChange={({ target }) => setUsername(target.value)} />
        </div>
        <div>password
            <input
            value={password}
            name="password"
            type="password"
            onChange={({ target }) => setPassword(target.value)} />
        </div>
        <button type="submit">log in</button>
      </form>
    </div>
  )

  const logout = (event) => {
    setUser(null)
    window.localStorage.clear()
  }

  const postBlog = async event => {
    event.preventDefault()
    const newBlog = { title, author, url }
    try {
      const result = await blogService.postBlog(newBlog)
      setNotify(`a new blog ${newBlog.title} added by ${user.username}`)
      setBlogs(blogs.concat(result))
      setTitle('')
      setUrl('')
      setAuthor("")
    }
    catch (err) { setNotify(err.response.data.error, "error") }
  }

  const blogForm = () => (
    <div>
      <h2>create new</h2>
      <form onSubmit={postBlog}>
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

  const setNotify = (message, type = 'success') => {
    setNotification({ message, type })
    setTimeout(() => setNotification(null), 5000)
  }
  const Notification = ({ notification }) => {
    if (notification === null) {
      return null
    }
    else return (<p className={notification.type}>{notification.message}</p>)
  }
  if (user === null) {
    return (
      <div>
        <Notification notification={notification} />
        { loginForm()}
      </div >)
  }
  return (

    <div>
      <h2>Blogs</h2>
      <Notification notification={notification} />
      <p><strong>{user.name}</strong> is logged in <button onClick={logout}>log out</button></p>

      {blogForm()}

      {blogs.map(blog => <Blog key={blog.id} blog={blog} />
      )}
    </div >

  )
}

export default App