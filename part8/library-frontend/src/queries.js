import { gql } from '@apollo/client'

export const AUTHOR_INFO = gql`
  fragment AuthorInfo on Author {
    name
    born
    bookCount
    id
  }
`

export const ALL_BOOKS = gql`
  ${AUTHOR_INFO}
  query {
    allBooks {
      author {
        ...AuthorInfo
      }
      title
      published
      genres
    }
  }
`

export const ALL_AUTHORS = gql`
  ${AUTHOR_INFO}
  query {
    allAuthors {
      ...AuthorInfo
    }
  }
`
export const ADD_BOOK = gql`
  mutation addBook(
    $title: String!
    $published: String!
    $genres: [String!]!
    $author: String!
  ) {
    addBook(
      title: $title
      published: $published
      genres: $genres
      author: $author
    ) {
      published
    }
  }
`

export const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $setBornTo: String!) {
    editAuthor(author: $name, setBornTo: $setBornTo) {
      name
      born
      id
    }
  }
`
export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`
export const CURRENTUSER = gql`
  query {
    me {
      username
      favoriteGenre
    }
  }
`
//not complete below
export const BOOK_ADDED = gql`
  ${AUTHOR_INFO}
  subscription {
    bookAdded {
      author {
        ...AuthorInfo
      }
      title
      published
      genres
    }
  }
`
