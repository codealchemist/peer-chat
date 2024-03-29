import * as process from 'process'
import SimplePeer from 'simple-peer'
window.SimplePeer = SimplePeer
window.global = window
window.process = process
window.Buffer = []

class Peer {
  constructor ({ isInitiator = false, id, signal } = {}) {
    this.isInitiator = isInitiator
    this.remoteSignal = signal
    this.id = id
  }

  init () {
    this.peer = new SimplePeer({
      initiator: this.isInitiator,
      trickle: false
    })
    this.setPeerEvents()
    return this
  }

  setPeerEvents () {
    console.log('set peer events')
    this.peer.on('error', err => {
      console.log('error', err)
      if (typeof this.onErrorCallback === 'function') {
        this.onErrorCallback(err)
      }
    })

    this.peer.on('close', err => {
      console.log('close', err)
      this.reconnect()
    })

    this.peer.on('signal', signal => {
      console.log('SIGNAL', JSON.stringify(signal))
      this.signal = signal
      if (typeof this.onSignalCallback === 'function') {
        this.onSignalCallback({ signal, id: this.id })
      }
    })

    this.peer.on('connect', () => {
      console.log('--- CONNECT ---')
      if (typeof this.onConnectCallback === 'function') {
        this.onConnectCallback()
      }
    })

    this.peer.on('data', data => {
      console.log('data: ' + data)
      if (typeof this.onDataCallback === 'function') {
        this.onDataCallback(data)
      }
    })

    window.peer = this.peer
  }

  reconnect () {
    console.log('RECONNECT')
    this.destroy()
    this.init()
  }

  onError (callback) {
    this.onErrorCallback = callback
    return this
  }

  onData (callback) {
    this.onDataCallback = callback
    return this
  }

  onSignal (callback) {
    this.onSignalCallback = callback
    return this
  }

  onConnect (callback) {
    this.onConnectCallback = callback
    return this
  }

  send (data) {
    if (!this.peer.connected) return
    const message = JSON.stringify({ payload: data })
    console.log('Peer SEND', message)
    this.peer.send(message)
  }

  connect (remoteSignal) {
    this.peer.signal(remoteSignal)
  }

  destroy () {
    this.peer.destroy()
  }
}

window.Peer = Peer
export default Peer
