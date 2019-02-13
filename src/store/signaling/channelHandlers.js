import { put } from 'redux-saga/effects'
import { gotRemoteSignal, initSuccess } from './actions'

export const initChannelHandlers = {
  remote_signal: function * (data) {
    yield put(gotRemoteSignal({ signal: data }))
  },
  connection: function * (data) {
    const { id, isInitiator, shareUrl } = data
    console.log('success, id:', id)
    yield put(initSuccess({ id, isInitiator, shareUrl }))
  }
}
