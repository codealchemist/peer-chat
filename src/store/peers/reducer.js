import { SET_SIGNAL, CREATE_LOCAL_PEER_SUCCESS } from './actionTypes'

const defaultState = {
  id: null,
  signal: null,
  peer: null,
  peers: []
}

const handlers = {
  [SET_SIGNAL]: (state, { payload }) => ({
    ...state,
    id: payload.id,
    signal: payload.signal
  }),
  [CREATE_LOCAL_PEER_SUCCESS]: (state, { payload }) => ({
    ...state,
    peer: payload.peer
  })
}

const reducer = (state = defaultState, action) => {
  if (!(action.type in handlers)) return state
  return handlers[action.type](state, action)
}
export default reducer
