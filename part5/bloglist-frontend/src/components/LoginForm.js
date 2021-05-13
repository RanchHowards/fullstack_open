import React from 'react'

const LoginForm = ({ username, password, handleLogin, handlePassword, handleUsername }) => (
    <div>
        <h1>log in to the app</h1>
        <form onSubmit={handleLogin}>
            <div>username
           <input
                    type="text"
                    name="username"
                    value={username}
                    onChange={handleUsername} />
            </div>
            <div>password
            <input
                    value={password}
                    name="password"
                    type="password"
                    onChange={handlePassword} />
            </div>
            <button type="submit">log in</button>
        </form>
    </div>
)

export default LoginForm