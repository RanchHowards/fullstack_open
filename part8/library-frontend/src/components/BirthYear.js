import React, { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { EDIT_AUTHOR, ALL_AUTHORS } from '../queries'

const BirthYear = () => {
  const result = useQuery(ALL_AUTHORS)

  const authors = result.data.allAuthors

  const [name, setName] = useState(authors[0].name)
  const [born, setBorn] = useState('')

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => console.log(error.graphQLErrors, error),
  })

  const handleChange = (event) => {
    setName(event.target.value)
  }

  const submit = (event) => {
    event.preventDefault()

    editAuthor({ variables: { name, setBornTo: born } }) //add refresh state thingy

    setBorn('')
  }

  return (
    <div>
      <h2>Set BirthYear</h2>
      <form onSubmit={submit}>
        name
        <select value={name} onChange={handleChange}>
          {/* {' '} //not sure what this was...*/}
          {authors.map((a) => (
            <option key={a.id} value={a.name}>
              {a.name}
            </option>
          ))}
        </select>
        <div>
          born
          <input
            value={born}
            type="number"
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">set Year</button>
      </form>
    </div>
  )
}

export default BirthYear
