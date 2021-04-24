import axios from 'axios'

const getAll = () => {
    const request = axios.get('http://localhost:3001/persons')
    return request.then(response => response.data)
}

const add = (newEntry) => {
    const request = axios.post('http://localhost:3001/persons', newEntry)
    return request.then(response => response.data)
}

export default { add, getAll }