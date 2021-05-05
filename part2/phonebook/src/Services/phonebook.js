import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const add = (newEntry) => {
    const request = axios.post(baseUrl, newEntry)
    return request.then(response => response.data)
}

const change = (updatedEntry) => {
    const request = axios.put(`${baseUrl}/${updatedEntry.id}`, updatedEntry)
    return request.then(response => response.data)

}
const remove = (id) => {
    console.log(id)
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => console.log(response))
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { add, getAll, remove, change }