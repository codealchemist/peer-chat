import {
  CREATE_LOCAL_PEER,
  CREATE_LOCAL_PEER_SUCCESS,
  CREATE_LOCAL_PEER_FAILED,
  CREATE_REMOTE_PEER,
  CREATE_REMOTE_PEER_SUCCESS,
  CREATE_REMOTE_PEER_FAILED,
  DESTROY,
  ADD,
  REMOVE,
  SET_SIGNAL
} from './actionTypes'

export const createLocalPeer = payload => ({
  type: CREATE_LOCAL_PEER,
  payload
})

export const createLocalPeerSuccess = payload => ({
  type: CREATE_LOCAL_PEER_SUCCESS,
  payload
})

export const createLocalPeerFailed = payload => ({
  type: CREATE_LOCAL_PEER_FAILED,
  payload
})

export const createRemotePeer = payload => ({
  type: CREATE_REMOTE_PEER,
  payload
})

export const createRemotePeerSuccess = payload => ({
  type: CREATE_REMOTE_PEER_SUCCESS,
  payload
})

export const createRemotePeerFailed = payload => ({
  type: CREATE_REMOTE_PEER_FAILED,
  payload
})

export const destroy = payload => ({
  type: DESTROY,
  payload
})

export const add = payload => ({
  type: ADD,
  payload
})

export const remove = payload => ({
  type: REMOVE,
  payload
})

export const setSignal = payload => ({
  type: SET_SIGNAL,
  payload
})
