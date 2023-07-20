import { createStore } from 'easy-peasy'
import user from './user'


// set global state

const state = {
  user,
}

export const store = createStore(state)
