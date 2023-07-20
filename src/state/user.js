import { action } from 'easy-peasy'

// global user state 

const user = {
  data: undefined,

  // get into the user it's data
  setUserData: action((state, payload) => {
    state.data = payload
  }),

  // update user data
  updateUserData: action((state, payload) => {
    state.data = {
      ...state.data,
      ...payload,
    }
  }),
}

export default user
