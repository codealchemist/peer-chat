/**
 * This file contains methods that are used to process data events
 * sent thru the WebRTC data channel.
 * This allows us to use the data channel for custom events.
 * For example, we use it to send messages and writing notifications.
 */
import { put } from 'redux-saga/effects'

import {
  addMessage,
  addWritingNotification,
  removeWritingNotification
} from 'store/chat/actions'

function * message (data) {
  console.log('-- MESSAGE', data)
  const message = {
    ...data,
    type: 'peer'
  }
  yield put(addMessage(message))
}

function * writing_notification (data) {
  console.log('-- WRITING NOTIFICATION', data)
  yield put(addWritingNotification(data))
}

function * clear_writing_notification (data) {
  console.log('-- CLEAR WRITING NOTIFICATION', data)
  yield put(removeWritingNotification(data))
}

export default {
  message,
  writing_notification,
  clear_writing_notification
}
