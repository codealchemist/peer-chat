import {
  ADD_MESSAGE,
  SEND_MESSAGE,
  ADD_WRITING_NOTIFICATION,
  REMOVE_WRITING_NOTIFICATION
} from './actionTypes'

const defaultState = {
  messages: [],
  writingNotifications: []
}

const handlers = {
  [SEND_MESSAGE]: (state, { payload }) => ({
    ...state,
    messages: state.messages.concat([payload])
  }),
  [ADD_MESSAGE]: (state, { payload }) => ({
    ...state,
    writingNotifications: state.writingNotifications.filter(
      notification => notification.user.id !== payload.user.id
    ),
    messages: state.messages.concat([payload])
  }),
  [ADD_WRITING_NOTIFICATION]: (state, { payload }) => ({
    ...state,
    writingNotifications: state.writingNotifications.concat([payload])
  }),
  [REMOVE_WRITING_NOTIFICATION]: (state, { payload }) => ({
    ...state,
    writingNotifications: state.writingNotifications.filter(
      notification => notification.user.id !== payload.user.id
    )
  })
}

const reducer = (state = defaultState, action) => {
  if (!(action.type in handlers)) return state
  return handlers[action.type](state, action)
}
export default reducer
