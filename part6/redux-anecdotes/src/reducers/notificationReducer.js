export const notificationChange = (content, time) => {
    return dispatch => {

        dispatch({
            type: "NOTIFICATION",
            content,
        }
        )

        const timeoutId = setTimeout(() => dispatch(notificationRemove()), time * 1000
        )
        dispatch(timeoutIdAction(timeoutId))

    }
}

export const notificationRemove = () => {
    return {
        type: "REMOVE"
    }
}
const timeoutIdAction = (id) => {
    return {
        type: "TIMEOUTID",
        id
    }
}


const notificationReducer = (state = null, action) => {
    switch (action.type) {
        case "NOTIFICATION": return { ...state, content: action.content }
        case "TIMEOUTID": return { ...state, timeoutId: action.id }
        case "REMOVE": return null
        default: return state
    }
}

export default notificationReducer