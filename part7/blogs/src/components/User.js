import React from 'react'
import { Table } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'

const User = () => {
  const id = useParams().id
  const userBlogs = useSelector((state) =>
    state.blogs.filter((blog) => blog.user.id === id)
  )
  if (!userBlogs[0]) {
    return null
  }
  return (
    <>
      <h1>{userBlogs[0].user.username}</h1>
      <h2>Added Blogs</h2>
      <Table striped>
        <tbody>
          {userBlogs.map((blog) => (
            <tr key={blog.id}>
              <td>{blog.title}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  )
}

export default User
