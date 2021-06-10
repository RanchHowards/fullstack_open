import React from 'react'
import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {
  // const hideWhenVisible = {
  //   border: '3px solid black',
  //   padding: '10px',
  //   margin: '5px 5px 5px 0',
  // }

  return (
    <div>
      <div className="hiddenAtFirst">
        <Link to={`blogs/${blog.id}`}>{blog.title}</Link> {blog.author}
      </div>
    </div>
  )
}

export default Blog
