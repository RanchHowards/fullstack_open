import blogService from '../services/blogs'
import { setNotify } from './notificationReducer'

export const initializeState = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch({ type: 'INIT', data: blogs })
  }
}

export const addBlog = (newBlog) => {
  return async (dispatch) => {
    dispatch({ type: 'NEWBLOG', data: newBlog })
  }
}

export const updateBlog = (updatedBlog) => {
  return async (dispatch) => {
    try {
      const result = await blogService.updateBlog(updatedBlog)
      dispatch({ type: 'UPDATE_BLOG', data: result })
    } catch (err) {
      dispatch(setNotify(err.message, 'danger'))
    }
  }
}

export const addBlogComment = (comment, id) => {
  return async (dispatch) => {
    try {
      const commentObj = { content: comment }
      const result = await blogService.postComment(commentObj, id)

      dispatch({ type: 'ADD_COMMENT', data: result })
    } catch (err) {
      dispatch(setNotify(err.message, 'danger'))
    }
  }
}

export const deleteBlog = (blogId) => {
  return async (dispatch) => {
    try {
      await blogService.deleteBlog(blogId)
      dispatch({ type: 'REMOVE_BLOG', blogId })
    } catch (err) {
      dispatch(setNotify(err.message, 'danger'))
    }
  }
}

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT':
      return action.data
    case 'NEWBLOG':
      return state.concat(action.data)
    case 'UPDATE_BLOG': {
      const newArr = state.map((blog) =>
        blog.id !== action.data.id ? blog : action.data
      )
      return newArr
    }
    case 'REMOVE_BLOG': {
      const updatedBlogs = state.filter((blog) => blog.id !== action.blogId)
      return (state = updatedBlogs)
    }
    case 'ADD_COMMENT': {
      const updatedBlogs = state.map((blog) =>
        blog.id !== action.data.id ? blog : action.data
      )
      return updatedBlogs
    }
    default:
      return state
  }
}

export default blogReducer
