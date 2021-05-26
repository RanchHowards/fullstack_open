import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteAction } from '../reducers/anecdoteReducer'
import { notificationChange } from '../reducers/notificationReducer'

const AnecdoteList = () => {


    const anecdotes = useSelector(state => {
        const filter = state.filter

        return state.anecdotes.filter(anecdote => anecdote.content.includes(filter))
    })
        .sort((a, b) => b.votes - a.votes)

    const dispatch = useDispatch()
    const timeoutId = useSelector(state => state.notification ? state.notification.timeoutId : 0)

    const vote = (anecdote) => {
        dispatch(voteAction(anecdote))

        clearTimeout(timeoutId)
        dispatch(notificationChange(`you voted "${anecdote.content}"`, 3))
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