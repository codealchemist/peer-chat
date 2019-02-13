import { eventChannel } from 'redux-saga'
import { put, takeEvery, take, select } from 'redux-saga/effects'
import { INIT_SUCCESS, GOT_REMOTE_SIGNAL } from 'store/signaling/actionTypes'
import {
  SEND_MESSAGE,
  SEND_WRITING_NOTIFICATION,
  SEND_CLEAR_WRITING_NOTIFICATION
} from 'store/chat/actionTypes'
import { getPeer, getSignal } from './selectors'
import {
  createLocalPeerSuccess,
  createLocalPeerFailed,
  createRemotePeerSuccess,
  createRemotePeerFailed,
  setSignal
} from './actions'
import Peer from 'services/peer'
import {
  createRemotePeerChannelHandlers,
  createLocalPeerChannelHandlers
} from './channelHandlers'

export function getRemotePeerEventChannel (remotePeer) {
  return eventChannel(emitter => {
    remotePeer
      .onSignal(signal => {
        emitter({ type: 'signal', data: signal })
      })
      .onData(data => {
        emitter({ type: 'data', data })
      })
      .onConnect(() => {
        emitter({ type: 'connect' })
      })
      .onError(error => {
        console.log('Got ERROR from Peer:', error)
        emitter({ type: 'error', data: error })
      })

    return () => {
      console.log('Channel unsubscribe.')
    }
  })
}

export function * createRemotePeer ({ payload }) {
  try {
    console.log('create remote peer', payload)
    const { signal, id } = payload
    const peer = yield select(getPeer)
    peer.connect(signal)

    const channel = getRemotePeerEventChannel(peer)
    const storedSignal = yield select(getSignal)

    // Use channel to get events from WebRTC peer.
    try {
      while (true) {
        const { type, data } = yield take(channel)
        console.log(
          `[ REMOTE PEER ]: GOT "${type}" DATA from EVENT CHANNEL:`,
          data
        )

        if (!(type in createRemotePeerChannelHandlers)) {
          console.log('There is no handler for remote peer data type:', type)
          return
        }
        yield createRemotePeerChannelHandlers[type]({ data, storedSignal })
      }
    } catch (e) {
      console.log('[ REMOTE PEER ]: Event channel error', e)
    }

    yield put(createRemotePeerSuccess({ peer: 'TODO' }))
  } catch (e) {
    yield put(createRemotePeerFailed({ error: e.message || 'Unknown error.' }))
  }
}

export function getLocalPeerEventChannel (localPeer) {
  return eventChannel(emitter => {
    localPeer
      .onSignal(signal => {
        emitter({ type: 'signal', data: signal })
      })
      .onData(data => {
        console.log('Got DATA from Peer:', data)
        emitter({ type: 'data', data })
      })
      .onError(error => {
        console.log('Got ERROR from Peer:', error)
        emitter({ type: 'error', data: error })
      })

    return () => {
      console.log('Channel unsubscribe.')
    }
  })
}

export function * createLocalPeer ({ payload }) {
  try {
    console.log('create local peer', payload)
    const localPeer = new Peer({
      id: payload.id,
      isInitiator: payload.isInitiator
    })
    localPeer.init()

    // Create peer for initiator.
    yield put(createLocalPeerSuccess({ peer: localPeer }))

    const channel = getLocalPeerEventChannel(localPeer)
    try {
      while (true) {
        const { type, data } = yield take(channel)
        console.log(
          `[ LOCAL PEER ]: GOT "${type}" DATA from EVENT CHANNEL:`,
          data
        )

        if (!(type in createLocalPeerChannelHandlers)) {
          console.log('There is no handler for remote peer data type:', type)
          return
        }
        yield createLocalPeerChannelHandlers[type](data)
      }
    } catch (e) {
      console.log('Event channel error', e)
    }
  } catch (e) {
    yield put(createLocalPeerFailed({ error: e.message || 'Unknown error.' }))
  }
}

export function * sendMessage ({ payload }) {
  console.log('PEER Saga: send message', payload)
  const peer = yield select(getPeer)
  peer.send({
    type: 'message',
    data: { ...payload }
  })
}

export function * sendWritingNotification ({ payload }) {
  console.log('PEER Saga: send writing notification', payload)
  const peer = yield select(getPeer)
  peer.send({
    type: 'writing_notification',
    data: { user: payload, date: new Date() }
  })
}

export function * sendClearWritingNotification ({ payload }) {
  console.log('PEER Saga: send clear writing notification', payload)
  const peer = yield select(getPeer)
  peer.send({
    type: 'clear_writing_notification',
    data: { user: payload, date: new Date() }
  })
}

export default function * signalingSagas () {
  console.log('peers saga')
  yield takeEvery(INIT_SUCCESS, createLocalPeer)
  yield takeEvery(GOT_REMOTE_SIGNAL, createRemotePeer)
  yield takeEvery(SEND_MESSAGE, sendMessage)
  yield takeEvery(SEND_WRITING_NOTIFICATION, sendWritingNotification)
  yield takeEvery(SEND_CLEAR_WRITING_NOTIFICATION, sendClearWritingNotification)
}
