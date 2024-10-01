import { useContext } from 'react'
import { createContext, useReducer } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SET-NOTIFICATION":
        return action.payload
    case "DELETE-NOTIFICATION":
        return null
    default:
        return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [counter, counterDispatch] = useReducer(notificationReducer, null)

  return (
    <NotificationContext.Provider value={[counter, counterDispatch] }>
      {props.children}
    </NotificationContext.Provider>
  )
}


export default NotificationContext