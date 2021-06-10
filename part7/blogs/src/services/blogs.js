import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const postBlog = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  }

  const request = await axios.post(baseUrl, newBlog, config)
  return request.data
}
const postComment = async (comment, id) => {
  const config = {
    headers: { Authorization: token },
  }
  const request = await axios.post(`${baseUrl}/${id}/comments`, comment, config)
  return request.data
}
const updateBlog = async (updatedBlog) => {
  const config = {
    headers: { Authorization: token },
  }
  const request = await axios.put(
    `${baseUrl}/${updatedBlog.id}`,
    updatedBlog,
    config
  )
  return request.data
}

const deleteBlog = async (blogId) => {
  const config = {
    headers: { Authorization: token },
  }
  const request = await axios.delete(`${baseUrl}/${blogId}`, config)
  return request.message
}

export default {
  getAll,
  setToken,
  postBlog,
  updateBlog,
  deleteBlog,
  postComment,
}
