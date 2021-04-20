import React, { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]

  const [selected, setSelected] = useState(0)
  const [arr, setArr] = useState(new Array(6).fill(0))

  const rand = () => Math.floor(Math.random() * 6)

  const changeQuote = () => setSelected(rand)
  const maxVotes = Math.max(...arr)
  const maxIndex = arr.indexOf(maxVotes)

  const vote = () => {
    const copy = [...arr]
    copy[selected] += 1
    setArr(copy)
  }


  return (
    <div>
      <h1>Anecdote of the Day</h1>
      <p>{anecdotes[selected]}</p>
      <h5>has {arr[selected]} votes</h5>
      <button onClick={changeQuote}>next anecdote</button>
      <button onClick={vote}>vote</button>

      <h2>Anecdote with most Votes</h2>
      <p>{anecdotes[maxIndex]}</p>
      <h5>has {maxVotes} votes</h5>
    </div>

  )
}

export default App