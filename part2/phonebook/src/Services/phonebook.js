import axios from 'axios'

const getAll = () => {
    const request = axios.get('http://localhost:3001/persons')
    return request.then(response => response.data)
}

const add = (newEntry) => {
    const request = axios.post('http://localhost:3001/persons', newEntry)
    return request.then(response => response.data)
}

const change = (updatedEntry) => {
    const request = axios.put(`http://localhost:3001/persons/${updatedEntry.id}`, updatedEntry)
    return request.then(response => response.data)

}
const remove = (id) => {
    console.log(id)
    const request = axios.delete(`http://localhost:3001/persons/${id}`)
    return request.then(response => console.log(response))
}

export default { add, getAll, remove, change }