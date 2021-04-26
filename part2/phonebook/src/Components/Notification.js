import React from 'react'

const Notification = ({ notification }) => {
    if (notification === null) {
        return null
    }
    else
        return (<h2 className={notification.type}>{notification.message}</h2>
        )
}

export default Notification