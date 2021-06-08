import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const User = () => {
  const blogs = useSelector((state) => state.blogs)

  const userCount = blogs.reduce((acc, cur) => {
    acc[cur.user.username]
      ? ++acc[cur.user.username].blogCount
      : (acc[cur.user.username] = { blogCount: 1, userId: [cur.user.id] })
    return acc
  }, {})

  const objArr = Object.keys(userCount).map((key) => [
    key,
    userCount[key].blogCount,
    userCount[key].userId,
  ])

  return (
    <div>
      <h1>USERS</h1>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>
              <strong>Blogs Created</strong>
            </th>
          </tr>
        </thead>
        <tbody>
          {objArr.map((user) => (
            <tr key={user[0]}>
              <td>
                <Link to={`${user[2]}`}>{user[0]}</Link>
              </td>
              <td>{user[1]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default User
