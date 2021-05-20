
export const notificationChange = (content) => {
    return {
        type: "NOTIFICATION",
        content,
    }
}

export const notificationRemove = () => {
    return {
        type: "REMOVE"
    }
}

const notificationReducer = (state = null, action) => {
    switch (action.type) {
        case "NOTIFICATION": return action.content
        case "REMOVE": return null
        default: return state
    }
}

export default notificationReducer