import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      setUser(user)
      setPassword('')
      setUsername('')
      blogService.setToken(user.token)
    }
    catch (exception) { console.log(exception) }
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

  const blogList = () =>
  (<div>
    <h2>Blogs</h2>
    {blogs.map(blog => <Blog key={blog.id} blog={blog} />
    )}
  </div>
  )
  return (
    <div>
      {user === null ? loginForm() : blogList()}

    </div>
  )
}

export default App