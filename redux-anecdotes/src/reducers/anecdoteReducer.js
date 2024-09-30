import { createSlice } from '@reduxjs/toolkit'
import anecdotesService from '../services/anecdotesService'

const initialState = []

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    vote(state, action) {
      const id = action.payload.id
      const changedAnecdote = action.payload
      return state.map((anecdote) =>
        anecdote.id === id ? changedAnecdote : anecdote
      )
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    },
  },
})

export const { vote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdotesService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdotesService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteAnecdote = (anecdoteToChange) => {
  const id = anecdoteToChange.id
  const changedAnecdote = {
    ...anecdoteToChange,
    votes: anecdoteToChange.votes + 1,
  }
  return async (dispatch) => {
    const modifiedAnecdote = await anecdotesService.update(id, changedAnecdote)
    dispatch(vote(modifiedAnecdote))
  }
}

export default anecdoteSlice.reducer
