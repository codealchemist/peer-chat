import { eventChannel } from 'redux-saga'
import { put, takeEvery, take, select } from 'redux-saga/effects'
import { CREATE } from './actionTypes'
import { INIT_SUCCESS, GOT_REMOTE_SIGNAL } from 'store/signaling/actionTypes'
import { getPeer, getSignal } from './selectors'
import {
  add,
  remove,
  destroy,
  createLocalPeerSuccess,
  createLocalPeerFailed,
  createRemotePeerSuccess,
  createRemotePeerFailed,
  setSignal
} from './actions'
import Peer from 'services/peer'

export function getRemotePeerEventChannel (remotePeer) {
  return eventChannel(emitter => {
    remotePeer
      .onSignal(signal => {
        emitter({ type: 'signal', data: signal })
      })
      .onData(data => {
        console.log('Got DATA from Peer:', data)
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

    try {
      while (true) {
        const { type, data } = yield take(channel)
        console.log(
          `[ REMOTE PEER ]: GOT "${type}" DATA from EVENT CHANNEL:`,
          data
        )
        switch (type) {
          case 'signal':
            if (storedSignal) {
              console.log('ALREADY GOT SIGNAL!')
              return
            }
            yield put(setSignal(data)) // {signal, id}
            break
          case 'connect':
            console.log('Peer connected!')
            break
          case 'data':
            console.log('got data from remotePeer event channel', data)
            break
          case 'error':
            console.log('got error from remotePeer event channel', data)
            break
        }
      }
    } catch (e) {
      console.log('Event channel error', e)
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
        switch (type) {
          case 'signal':
            yield put(setSignal(data)) // {signal, id}
            break
          case 'data':
            console.log('got data from localPeer event channel', data)
            break
          case 'error':
            console.log('got error from localPeer event channel', data)
            break
        }
      }
    } catch (e) {
      console.log('Event channel error', e)
    }
  } catch (e) {
    yield put(createLocalPeerFailed({ error: e.message || 'Unknown error.' }))
  }
}

export default function * signalingSagas () {
  console.log('peers saga')
  yield takeEvery(INIT_SUCCESS, createLocalPeer)
  yield takeEvery(GOT_REMOTE_SIGNAL, createRemotePeer)
}
