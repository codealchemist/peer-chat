import {
  ADD_MESSAGE,
  SEND_MESSAGE,
  SEND_MESSAGE_SUCCESS,
  SEND_MESSAGE_FAILED,
  ADD_WRITING_NOTIFICATION,
  REMOVE_WRITING_NOTIFICATION,
  SEND_WRITING_NOTIFICATION,
  SEND_CLEAR_WRITING_NOTIFICATION
} from './actionTypes'

export const addMessage = payload => ({
  type: ADD_MESSAGE,
  payload
})

export const sendMessage = payload => ({
  type: SEND_MESSAGE,
  payload
})

export const sendMessageSuccess = () => ({
  type: SEND_MESSAGE_SUCCESS
})

export const sendMessageFailed = () => ({
  type: SEND_MESSAGE_FAILED
})

export const addWritingNotification = payload => ({
  type: ADD_WRITING_NOTIFICATION,
  payload
})

export const removeWritingNotification = payload => ({
  type: REMOVE_WRITING_NOTIFICATION,
  payload
})

export const sendWritingNotification = payload => ({
  type: SEND_WRITING_NOTIFICATION,
  payload
})

export const sendClearWritingNotification = payload => ({
  type: SEND_CLEAR_WRITING_NOTIFICATION,
  payload
})
