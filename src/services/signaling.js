import nanoid from 'nanoid'
import { Realtime } from 'ably'

function log () {
  console.log('[ Signaling ]', ...arguments)
}
class Signaling {
  constructor () {
    this.baseUrl = `${window.location.protocol}//${window.location.host}`
    this.id = nanoid(12)
    this.initiatorId = this.getInitiatorId()
    this.isInitiator = !this.initiatorId
    this.onErrorCallback = null
    this.isConnected = false

    this.client = new Realtime({
      authUrl: `${this.baseUrl}/.netlify/functions/ably-token-request?clientId=${this.id}`,
      echoMessages: false
    })

    // Set sharing URL only when not connecting to an initiator.
    // The initiator creates sharing.
    this.shareUrl = ''
    if (this.isInitiator) this.setSharingUrl()
  }

  setSharingUrl () {
    this.shareUrl = `${this.baseUrl}#${this.id}`
  }

  setSignal (signal) {
    this.signal = signal
  }

  init () {
    console.log('PEER ID', this.id)
    console.log('INITIATOR ID:', this.initiatorId)
    this.channelName = this.initiatorId || this.id
    console.log('CHANNEL', this.channelName)

    this.channelId = this.initiatorId || this.id
    this.connect().setEvents()

    // If not the initiator, request offer to initiator.
    if (!this.isInitiator) {
      console.log('Signaling: SEND REQUEST MSG')
      this.send({ id: this.id, type: 'request' })
    }

    return this
  }

  connect () {
    this.channel = this.client.channels.get(this.channelId)
    return this
  }

  setEvents () {
    this.client.connection.on('connected', () => {
      log('Connected to ably!')
      this.isConnected = true
    })

    this.client.connection.on('failed', () => {
      log('Connection to ably failed')
    })

    this.channel.subscribe('message', (raw) => {
      const { data } = raw
      this.onSignalMessage(data)
    })
  }

  onSignalMessage (message) {
    log('new message received', message)
    const { signal, id, type } = message || {}

    // Ignore own messages.
    if (id === this.id) return

    // Only the initiator will answer with offers to other peers.
    // Send offer using signaling channel.
    if (this.isInitiator && type === 'request') {
      log('Signaling: SEND OFFER MSG')
      this.send({ id: this.id, type: 'offer', signal: this.signal })
      return
    }

    // Only normal peers will use signaling data from the initiator.
    if (!this.isInitiator && type === 'request') return
    if (!signal) return

    if (typeof this.onRemoteSignalCallback === 'function') {
      this.onRemoteSignalCallback(signal)
    }
  }

  send (message) {
    // Wait for connection.
    if (!this.isConnected) {
      log('Wait for socket connection...')
      setTimeout(() => this.send(message), 250)
      return
    }

    this.channel.publish('message', message)
    return this
  }

  onRemoteSignal (callback) {
    this.onRemoteSignalCallback = callback
  }

  getInitiatorId () {
    const hash = window.location.hash.substr(1)
    return hash
  }
}

const signaling = new Signaling()
export default signaling
