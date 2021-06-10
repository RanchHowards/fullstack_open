import React from 'react'
import { useSelector } from 'react-redux'
import Alert from 'react-bootstrap/Alert'

const Notification = () => {
  const notification = useSelector((state) => state.notifications)

  if (notification === null) {
    return null
  } else
    return <Alert variant={notification.format}>{notification.message}</Alert>
}

export default Notification
