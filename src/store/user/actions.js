import { SET_NAME, SET_AVATAR, SET_ID } from './actionTypes'

export const setName = payload => ({
  type: SET_NAME,
  payload
})

export const setAvatar = payload => ({
  type: SET_AVATAR,
  payload
})

export const setId = payload => ({
  type: SET_ID,
  payload
})
