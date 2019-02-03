import signalhub from 'signalhub'
import nanoid from 'nanoid'

class Signaling {
  constructor () {
    this.baseUrl = `${window.location.protocol}//${window.location.host}`
    this.id = nanoid(12)
    this.initiatorId = this.getInitiatorId()
    this.isInitiator = !this.initiatorId
    this.onErrorCallback = null

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
    this.hub = signalhub('peer-chat', [
      'https://peer-chat-signalhub.herokuapp.com'
    ])
    this.hub
      .subscribe(this.channelName)
      .on('data', message => this.onSignalMessage(message))

    // If not the initiator, request offer to initiator.
    if (!this.isInitiator) {
      console.log('Signaling: SEND REQUEST MSG')
      this.hub.broadcast(this.channelName, { id: this.id, type: 'request' })
    }

    return this
  }

  onSignalMessage (message) {
    console.log('new message received', message)
    const { signal, id, type } = message || {}

    // Ignore own messages.
    if (id === this.id) return

    // Only the initiator will answer with offers to other peers.
    // Send offer using signaling channel.
    if (this.isInitiator && type === 'request') {
      this.hub.broadcast(this.channelName, {
        id: this.id,
        type: 'offer',
        signal: this.signal
      })
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
    this.hub.broadcast(this.channelName, {
      id: this.id,
      ...message
    })
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
