export const setNotify = (message, format = 'success') => {
  return async (dispatch) => {
    await dispatch({
      type: 'UPDATE',
      message,
      format,
    })
    setTimeout(() => dispatch({ type: 'REMOVE' }), 3000)
  }
}

export const notificationRemove = () => {
  return {
    type: 'REMOVE',
  }
}

const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'UPDATE':
      return {
        message: action.message,
        format: action.format,
      }
    case 'REMOVE': {
      state = null
    }

    // eslint-disable-next-line no-fallthrough
    default:
      return state
  }
}

export default notificationReducer
