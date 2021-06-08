import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Users from './components/Users'
import Toggeler from './components/Toggeler'
import User from './components/User'
import blogService from './services/blogs'
import loginService from './services/login'
import { useDispatch, useSelector } from 'react-redux'
import { setNotify } from './reducers/notificationReducer'
import { initializeState, addBlog } from './reducers/blogReducer'
import { storeUser, removeUser } from './reducers/userReducer'
import { Switch, Route, useRouteMatch } from 'react-router-dom'

const App = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  // const [user, setUser] = useState(null)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    dispatch(initializeState())
  }, [])

  useEffect(() => {
    const storedUser = window.localStorage.getItem('loggedUser')
    if (storedUser) {
      const user = JSON.parse(storedUser)
      dispatch(storeUser(user))
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      dispatch(storeUser(user))
      dispatch(setNotify(`successfully logged in ${user.username}`, 'success'))
      setPassword('')
      setUsername('')
      blogService.setToken(user.token)
    } catch (error) {
      dispatch(setNotify(error.response.data.error, 'error'))
    }
  }

  const logout = () => {
    dispatch(removeUser())
    window.localStorage.clear()
  }

  const postBlog = async (newBlog) => {
    try {
      const result = await blogService.postBlog(newBlog)
      dispatch(
        setNotify(`a new blog ${newBlog.title} added by ${user.username}`)
      )
      dispatch(addBlog(result))
      setVisible(true)
    } catch (err) {
      dispatch(setNotify(err.response.data.error, 'error'))
    }
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const sortedBlogs = useSelector((state) => state.blogs).sort(
    (a, b) => b.likes - a.likes
  )

  const user = useSelector((state) => state.user)

  const match = useRouteMatch('/users/:id')

  const blogInfo = match
    ? sortedBlogs.find((blog) => blog.user.id === match.params.id)
    : null

  if (user === null) {
    return (
      <div>
        <Notification />
        <LoginForm
          password={password}
          username={username}
          handleLogin={handleLogin}
          handleUsername={({ target }) => setUsername(target.value)}
          handlePassword={({ target }) => setPassword(target.value)}
        />
      </div>
    )
  }
  return (
    <div>
      <h2>Blogs</h2>
      <Notification />
      <p>
        <strong>{user.name}</strong> is logged in{' '}
        <button onClick={logout}>log out</button>
      </p>
      <Switch>
        <Route path="/users/:id">
          <User blog={blogInfo} />
        </Route>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/">
          <Toggeler
            buttonName="add Blog"
            visible={visible}
            toggleVisibility={toggleVisibility}
          >
            <BlogForm postBlog={postBlog} />
          </Toggeler>
          {sortedBlogs.map((blog) => (
            <Blog key={blog.id} blog={blog} loggedUser={user} />
          ))}
        </Route>
      </Switch>
    </div>
  )
}

export default App
