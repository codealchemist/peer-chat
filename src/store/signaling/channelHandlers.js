import { put } from 'redux-saga/effects'
import { gotRemoteSignal } from './actions'

export const initChannelHandlers = {
  remote_signal: function * (data) {
    yield put(gotRemoteSignal({ signal: data }))
  }
}
