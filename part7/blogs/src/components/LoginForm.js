/* eslint-disable indent */
import React from 'react'
import { Form, Button } from 'react-bootstrap'

const LoginForm = ({
  username,
  password,
  handleLogin,
  handlePassword,
  handleUsername,
}) => (
  <div>
    <h1>log in to the app</h1>
    <Form onSubmit={handleLogin} id="loginForm">
      <Form.Group>
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          name="username"
          id="username"
          value={username}
          onChange={handleUsername}
        />

        <Form.Label>password</Form.Label>
        <Form.Control
          value={password}
          name="password"
          type="password"
          id="password"
          onChange={handlePassword}
        />

        <Button type="submit" id="submitButton" style={{ marginTop: 10 }}>
          log in
        </Button>
      </Form.Group>
    </Form>
  </div>
)

export default LoginForm
