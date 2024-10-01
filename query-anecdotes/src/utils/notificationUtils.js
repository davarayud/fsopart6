import { useContext } from 'react'
import NotificationContext from '../NotificationContext'

const useNotificationValue = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[0]
}

const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[1]
}

const deleteNotif = () => {
  return { type: 'DELETE-NOTIFICATION' }
}

const setNotif = (notification) => {
  return { type: 'SET-NOTIFICATION', payload: notification }
}

export default {
  useNotificationValue,
  useNotificationDispatch,
  deleteNotif,
  setNotif
}
