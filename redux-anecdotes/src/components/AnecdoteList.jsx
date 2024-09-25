import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => {
    const result = state.anecdotes.filter((anecdote) =>
      anecdote.content.toUpperCase().includes(state.filter.toUpperCase())
    )
    return [...result].sort((a, b) => b.votes - a.votes)
  }, shallowEqual)
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(voteAnecdote(id))
  }

  return (
    <>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </>
  )
}

export default AnecdoteList
