import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector((state) => state.notifications)

  if (notification === null) {
    return null
  } else return <p className={notification.format}>{notification.message}</p>
}

export default Notification
