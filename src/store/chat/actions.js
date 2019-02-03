import {
  ADD_MESSAGE,
  SEND_MESSAGE,
  SEND_MESSAGE_SUCCESS,
  SEND_MESSAGE_FAILED
} from './actionTypes'

export const addMessage = () => ({
  type: ADD_MESSAGE
})

export const sendMessage = () => ({
  type: SEND_MESSAGE
})

export const sendMessageSuccess = () => ({
  type: SEND_MESSAGE_SUCCESS
})

export const sendMessageFailed = () => ({
  type: SEND_MESSAGE_FAILED
})
