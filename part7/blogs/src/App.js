import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogView from './components/BlogView'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Users from './components/Users'
import Toggeler from './components/Toggeler'
import User from './components/User'
import Header from './components/Navbar'
import blogService from './services/blogs'
import loginService from './services/login'

import { useDispatch, useSelector } from 'react-redux'
import { setNotify } from './reducers/notificationReducer'
import { initializeState, addBlog } from './reducers/blogReducer'
import { storeUser } from './reducers/userReducer'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import Table from 'react-bootstrap/Table'

const App = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
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
      dispatch(setNotify(error.response.data.error, 'danger'))
    }
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
      dispatch(setNotify(err.response.data.error, 'danger'))
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
      <div className="container">
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
    <div className="container">
      <Header />
      <Notification />

      <Switch>
        <Route path="/users/:id">
          <User blog={blogInfo} />
        </Route>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/blogs/:id">
          <BlogView />
        </Route>
        <Route path="/">
          <h1>BLOGS</h1>

          <Toggeler
            buttonName="add Blog"
            visible={visible}
            toggleVisibility={toggleVisibility}
          >
            <BlogForm postBlog={postBlog} />
          </Toggeler>
          <Table striped>
            <tbody>
              {sortedBlogs.map((blog) => (
                <tr key={blog.id}>
                  <td>
                    <Blog blog={blog} loggedUser={user} />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Route>
      </Switch>
    </div>
  )
}

export default App
