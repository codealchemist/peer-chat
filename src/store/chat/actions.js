import {
  ADD_MESSAGE,
  SEND_MESSAGE,
  SEND_MESSAGE_SUCCESS,
  SEND_MESSAGE_FAILED
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
