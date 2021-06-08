export const storeUser = (user) => {
  return { type: 'STORE_USER', user }
}

export const removeUser = () => {
  return { type: 'REMOVE_USER' }
}

const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'STORE_USER': {
      return action.user
    }
    case 'REMOVE_USER': {
      return (state = null)
    }
    default:
      return state
  }
}

export default userReducer
