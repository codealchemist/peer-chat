import { INIT_SUCCESS, INIT_FAILED } from './actionTypes'

const defaultState = {
  id: '',
  isInitiator: false,
  shareUrl: '',
  error: ''
}

const handlers = {
  [INIT_FAILED]: (state, { payload }) => ({
    ...defaultState,
    error: payload.error
  }),
  [INIT_SUCCESS]: (state, { payload }) => ({
    ...state,
    id: payload.id,
    isInitiator: payload.isInitiator,
    shareUrl: payload.shareUrl
  })
}

const reducer = (state = defaultState, action) => {
  if (!(action.type in handlers)) return state
  return handlers[action.type](state, action)
}
export default reducer
