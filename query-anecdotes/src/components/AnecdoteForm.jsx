import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../request'
import notificationUtils from '../utils/notificationUtils'

const AnecdoteForm = () => {
  const NotifDispatch = notificationUtils.useNotificationDispatch()
  const queryClient = useQueryClient()
  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (anecdote) => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      NotifDispatch(notificationUtils.setNotif(`Anecdote '${anecdote.content}' added`))
      setTimeout(() => NotifDispatch(notificationUtils.deleteNotif()), 5000)
    },
    onError: (error) => {
      NotifDispatch(notificationUtils.setNotif(error.response.data.error))
      setTimeout(() => NotifDispatch(notificationUtils.deleteNotif()), 5000)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
