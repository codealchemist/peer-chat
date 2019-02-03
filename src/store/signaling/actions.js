import {
  INIT,
  INIT_SUCCESS,
  INIT_FAILED,
  SEND_SIGNAL,
  SEND_SIGNAL_SUCCESS,
  SEND_SIGNAL_ERROR,
  GOT_REMOTE_SIGNAL
} from './actionTypes'

export const init = () => ({
  type: INIT
})

export const initSuccess = payload => ({
  type: INIT_SUCCESS,
  payload
})

export const initFailed = payload => ({
  type: INIT_FAILED,
  payload
})

export const sendSignal = payload => ({
  type: SEND_SIGNAL,
  payload
})

export const sendSignalSuccess = payload => ({
  type: SEND_SIGNAL_SUCCESS,
  payload
})

export const sendSignalError = payload => ({
  type: SEND_SIGNAL_ERROR,
  payload
})

export const gotRemoteSignal = payload => ({
  type: GOT_REMOTE_SIGNAL,
  payload
})
