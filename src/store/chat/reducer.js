import { ADD_MESSAGE } from './actionTypes'

const defaultState = {
  messages: []
}

const handlers = {
  [ADD_MESSAGE]: (state, { payload }) => ({
    messages: state.messages.concat([payload.message])
  })
}

const reducer = (state = defaultState, action) => {
  if (!(action.type in handlers)) return defaultState
  return handlers[action.type](state, action)
}
export default reducer
