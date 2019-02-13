import { put } from 'redux-saga/effects'
import { setSignal } from './actions'
import peerDataHandlers from './peerDataHandlers'

function * handleRemotePeerData (data) {
  const { payload } = JSON.parse(data)
  console.log('handle remote peer data', payload)

  const { type } = payload
  if (!(type in peerDataHandlers)) {
    console.log('There is no handler for remote peer data type:', type)
    return
  }
  yield peerDataHandlers[type](payload.data)
}

export const createRemotePeerChannelHandlers = {
  signal: function * ({ data, storedSignal }) {
    if (storedSignal) {
      console.log('ALREADY GOT SIGNAL!')
      return
    }
    yield put(setSignal(data)) // {signal, id}
  },
  connect: function * ({ data }) {
    console.log('Peer connected!', data)
    // TODO
  },
  data: function * ({ data }) {
    yield handleRemotePeerData(data)
  },
  error: function * ({ data }) {
    console.log('got error from remotePeer event channel', data)
    // TODO
  }
}

export const createLocalPeerChannelHandlers = {
  signal: function * (data) {
    yield put(setSignal(data)) // {signal, id}
  },
  data: function * (data) {
    // TODO
  },
  error: function * (data) {
    console.log('got error from localPeer event channel', data)
    // TODO
  }
}
