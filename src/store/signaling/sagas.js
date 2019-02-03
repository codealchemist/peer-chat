import { eventChannel } from 'redux-saga'
import { put, call, takeEvery, take } from 'redux-saga/effects'
import {
  initSuccess,
  initFailed,
  sendSignalSuccess,
  sendSignalError,
  gotRemoteSignal
} from './actions'
import signaling from 'services/signaling'
import { SET_SIGNAL } from 'store/peers/actionTypes'

export function getSignalingEventChannel (signaling) {
  return eventChannel(emitter => {
    signaling.onRemoteSignal(data => {
      console.log('signaling: got remote signal')
      emitter({ type: 'remote-signal', data })
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

    console.log('success, id:', signaling.id)
    yield put(
      initSuccess({
        id: signaling.id,
        isInitiator: signaling.isInitiator,
        shareUrl: signaling.shareUrl
      })
    )

    const channel = getSignalingEventChannel(signaling)
    const { type, data } = yield take(channel)
    console.log(`Got signaling CHANNEL "${type}" DATA`, data)
    switch (type) {
      case 'remote-signal':
        yield put(gotRemoteSignal({ signal: data }))
        break
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
