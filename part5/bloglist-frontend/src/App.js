import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Toggeler from './components/Toggeler'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const [visible, setVisible] = useState(true)


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



  const logout = (event) => {
    setUser(null)
    window.localStorage.clear()
  }

  const postBlog = async (newBlog) => {

    try {
      const result = await blogService.postBlog(newBlog)
      setNotify(`a new blog ${newBlog.title} added by ${user.username}`)
      setBlogs(blogs.concat(result))
      setVisible(true)
    }
    catch (err) { setNotify(err.response.data.error, "error") }
  }

  const setNotify = (message, type = 'success') => {
    setNotification({ message, type })
    setTimeout(() => setNotification(null), 5000)
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  if (user === null) {
    return (
      <div>
        <Notification notification={notification} />
        <LoginForm
          password={password}
          username={username}
          handleLogin={handleLogin}
          handleUsername={({ target }) => setUsername(target.value)}
          handlePassword={({ target }) => setPassword(target.value)}

        />
      </div >)
  }
  return (

    <div>
      <h2>Blogs</h2>
      <Notification notification={notification} />
      <p><strong>{user.name}</strong> is logged in <button onClick={logout}>log out</button></p>

      <Toggeler buttonName="add Blog"
        visible={visible}
        toggleVisibility={toggleVisibility}>
        <BlogForm
          postBlog={postBlog}
        />
      </Toggeler>
      {blogs.map(blog => <Blog
        key={blog.id}
        blog={blog}
      />
      )}
    </div >

  )
}

export default App