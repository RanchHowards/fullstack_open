import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries'

const Login = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      console.log('FROM LOGIN MUTATtion!', error.graphQLErrors[0].message)
    },
  })

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      props.setToken(token)
      localStorage.setItem('user-token', token)
    }
  }, [result.data]) // eslint-disable-line

  const submit = (event) => {
    event.preventDefault()
    login({ variables: { username, password } })

    props.setPage('authors')
  }

  if (!props.show) {
    return null
  }
  if (result.loading) {
    return <div>LOADING</div>
  }

  //   const books = result.data.allBooks

  return (
    <div>
      <h2>login</h2>
      <form onSubmit={submit}>
        username
        <input
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
        password
        <input
          value={password}
          type="password"
          onChange={({ target }) => setPassword(target.value)}
        />
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default Login
