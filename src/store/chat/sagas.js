import { put, takeLatest } from 'redux-saga/effects'
import { SEND_MESSAGE } from './actionTypes'
import { addMessage, sendMessageSuccess, sendMessageFailed } from './actions'

export function * sendMessage ({ payload }) {
  try {
    console.log('send message')
    put(addMessage({ message: payload.message }))

    // TODO: send message and get output; success or failed
  } catch (e) {
    yield put(
      sendMessageFailed({
        message: payload.message,
        error: e
      })
    )
  }
}

export default function * chatSagas () {
  console.log('chat saga')
  yield takeLatest(SEND_MESSAGE, sendMessage)
}
