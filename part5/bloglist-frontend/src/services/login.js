/* eslint-disable indent */
import axios from 'axios'
const baseUrl = '/api/login'

const login = async credentials => {
    // eslint-disable-next-line indent
    const response = await axios.post(baseUrl, credentials)
    return response.data
}

export default { login }