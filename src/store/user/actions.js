import { SET_NAME, SET_AVATAR } from './actionTypes'

export const setName = payload => ({
  type: SET_NAME,
  payload
})

export const setAvatar = payload => ({
  type: SET_AVATAR,
  payload
})
