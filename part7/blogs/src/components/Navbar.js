import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeUser } from '../reducers/userReducer'
import { Navbar, Nav, Button } from 'react-bootstrap'

const Header = () => {
  const dispatch = useDispatch()

  const user = useSelector((state) => state.user)
  const logout = () => {
    dispatch(removeUser())
    window.localStorage.clear()
  }

  return (
    <Navbar bg="primary" variant="dark">
      <Navbar.Brand>BLOG APP</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="/">Blogs</Nav.Link>
        <Nav.Link href="/users">Users</Nav.Link>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            <strong>{user.name}</strong> is logged in
          </Navbar.Text>
          <Button onClick={logout}>log out</Button>
        </Navbar.Collapse>
      </Nav>
    </Navbar>
  )
}

export default Header
