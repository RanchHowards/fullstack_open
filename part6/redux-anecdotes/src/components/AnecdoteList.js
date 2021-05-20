import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteAction } from '../reducers/anecdoteReducer'
import { notificationRemove, notificationChange } from '../reducers/notificationReducer'

const AnecdoteList = () => {


    const anecdotes = useSelector(state => {
        const filter = state.filter

        return state.anecdotes.filter(anecdote => anecdote.content.includes(filter))
    })
        .sort((a, b) => b.votes - a.votes)

    const dispatch = useDispatch()

    const vote = ({ id, content }) => {
        dispatch(voteAction(id))
        dispatch(notificationChange(`you vote "${content}"`))
        setTimeout(() => dispatch(notificationRemove()), 3000)
    }
    return (anecdotes.map(anecdote =>
        <div key={anecdote.id}>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote)}>vote</button>
            </div>
        </div>
    ))
}

export default AnecdoteList