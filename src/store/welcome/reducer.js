import { SET_USER } from './actionTypes'

const defaultState = {
  name: '',
  avatar: ''
}

const handlers = {
  [SET_USER]: (state, { payload }) => ({
    name: payload.name,
    avatar: payload.avatar
  })
}

const reducer = (state = defaultState, action) => {
  if (!(action.type in handlers)) return defaultState
  return handlers[action.type](state, action)
}
export default reducer
