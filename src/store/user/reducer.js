import { SET_NAME, SET_AVATAR } from './actionTypes'

const defaultState = {
  name: '',
  avatar: 'account_circle'
}

const handlers = {
  [SET_NAME]: (state, { payload }) => ({
    ...state,
    name: payload.name
  }),
  [SET_AVATAR]: (state, { payload }) => ({
    ...state,
    avatar: payload.avatar
  })
}

const reducer = (state = defaultState, action) => {
  if (!(action.type in handlers)) return state
  return handlers[action.type](state, action)
}
export default reducer
