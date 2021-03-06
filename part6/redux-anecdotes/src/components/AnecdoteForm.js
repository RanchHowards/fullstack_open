import React from 'react'
import { connect } from 'react-redux'
import { addAnecdoteAction } from '../reducers/anecdoteReducer'

const AnecdoteForm = (props) => {

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    props.addAnecdoteAction(content)

  }
  return (<div>
    <h2>create new</h2>
    <form onSubmit={addAnecdote}>
      <div><input name="anecdote" /></div>
      <button>create</button>
    </form>
  </div>
  )
}
const mapDispatchToState = {
  addAnecdoteAction
}

export default connect(null, mapDispatchToState)(AnecdoteForm)