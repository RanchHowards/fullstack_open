/* eslint-disable indent */
import React from 'react'

const LoginForm = ({ username, password, handleLogin, handlePassword, handleUsername }) => (
    <div>
        <h1>log in to the app</h1>
        <form onSubmit={handleLogin} id="loginForm">
            <div>username
           <input
                    type="text"
                    name="username"
                    id='username'
                    value={username}
                    onChange={handleUsername} />
            </div>
            <div>password
            <input
                    value={password}
                    name="password"
                    type="password"
                    id='password'
                    onChange={handlePassword} />
            </div>
            <button type="submit" id='submitButton'>log in</button>
        </form>
    </div>
)

export default LoginForm