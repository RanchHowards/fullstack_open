import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  const [genre, setGenre] = useState(null)
  const result = useQuery(ALL_BOOKS)

  if (!props.show) {
    return null
  }
  if (result.loading) {
    return <div>LOADING</div>
  }

  const books = result.data.allBooks

  const booksFilter = books.filter((a) =>
    genre ? a.genres.includes(genre) : a
  )

  const uniqueGenres = books
    .map((a) => a.genres) //array of arrays
    .flat() //flattened into one array
    .filter((v, i, a) => a.indexOf(v) === i) //filtered for unique values

  return (
    <div>
      <h2>books</h2>
      {genre && <div>selected genre = {genre}</div>}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {booksFilter.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {uniqueGenres.map((a) => (
          <button key={a} onClick={() => setGenre(a)}>
            {a}
          </button>
        ))}
        <button onClick={() => setGenre(null)}>reset</button>
      </div>
    </div>
  )
}

export default Books
