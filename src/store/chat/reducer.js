import { ADD_MESSAGE, SEND_MESSAGE } from './actionTypes'

const defaultState = {
  messages: []
}

const handlers = {
  [SEND_MESSAGE]: (state, { payload }) => ({
    messages: state.messages.concat([payload])
  }),
  [ADD_MESSAGE]: (state, { payload }) => ({
    messages: state.messages.concat([payload])
  })
}

const reducer = (state = defaultState, action) => {
  if (!(action.type in handlers)) return defaultState
  return handlers[action.type](state, action)
}
export default reducer
