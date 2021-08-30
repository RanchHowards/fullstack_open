import React from 'react'
import { useQuery } from '@apollo/client'
import { CURRENTUSER, ALL_BOOKS } from '../queries'

const Recommendations = (props) => {
  const resultUser = useQuery(CURRENTUSER)
  const resultBooks = useQuery(ALL_BOOKS)

  if (!props.show) {
    return null
  }
  if (resultUser.loading || resultBooks.loading) {
    return <div>LOADING</div>
  }

  const favGenre = resultUser.data.me.favoriteGenre
  const books = resultBooks.data.allBooks.filter((a) =>
    a.genres.includes(favGenre)
  )
  return (
    <div>
      <h2>recommendations</h2>
      <h3>
        books in your favorite genre: <strong>{favGenre}</strong>
      </h3>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommendations
