/* eslint-disable indent */
import React from 'react'

const Notification = ({ notification }) => {
    if (notification === null) {
        return null
    }
    else return (<p className={notification.type}>{notification.message}</p>)
}

export default Notification