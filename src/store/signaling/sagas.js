import { eventChannel } from 'redux-saga'
import { put, call, takeEvery, take } from 'redux-saga/effects'
import {
  initSuccess,
  initFailed,
  sendSignalSuccess,
  sendSignalError
} from './actions'
import signaling from 'services/signaling'
import { SET_SIGNAL } from 'store/peers/actionTypes'
import { initChannelHandlers } from './channelHandlers'

export function getSignalingEventChannel (signaling) {
  return eventChannel(emitter => {
    signaling
      .onRemoteSignal(data => {
        console.log('signaling: got remote signal')
        emitter({ type: 'remote_signal', data })
      })
      .onOpen(() => {
        console.log('signaling: connection open')
        const data = {
          id: signaling.id,
          isInitiator: signaling.isInitiator,
          shareUrl: signaling.shareUrl
        }
        emitter({ type: 'connection', data })
      })

    return () => {
      console.log('Unsubscribe from signaling event channel.')
    }
  })
}

export function * init () {
  try {
    console.log('init signaling')
    signaling.init()

    const channel = getSignalingEventChannel(signaling)
    while (true) {
      const { type, data } = yield take(channel)
      console.log(`Got signaling CHANNEL "${type}" DATA`, data)

      if (!(type in initChannelHandlers)) {
        console.log('There is no handler for signaling data type:', type)
        return
      }
      yield initChannelHandlers[type](data)
    }
  } catch (e) {
    yield put(initFailed({ error: e.message || 'Unknown error.' }))
  }
}

export function * send ({ payload }) {
  try {
    console.log('send local signal to remote peer', payload)
    signaling.setSignal(payload.signal)
    signaling.send({ signal: payload.signal })
    yield put(sendSignalSuccess(payload))
  } catch (e) {
    yield put(sendSignalError({ error: e.message || 'Unknown error.' }))
  }
}

export default function * signalingSagas () {
  console.log('signaling saga')
  yield takeEvery(SET_SIGNAL, send)
  yield call(init)
}
