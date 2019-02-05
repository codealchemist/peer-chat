import sagas, { send, init } from './sagas'
import { put, takeEvery, call } from 'redux-saga/effects'
import { SET_SIGNAL } from 'store/peers/actionTypes'
import { setSignal } from 'store/peers/actions'
import signaling from 'services/signaling'
import { sendSignalSuccess, sendSignalError } from './actions'

jest.mock('services/signaling', () => ({
  setSignal: jest.fn(),
  send: jest.fn()
}))

describe('Signaling sagas', () => {
  describe('default saga', () => {
    const generator = sagas()

    it('should take every SET_SIGNAL', () => {
      const expected = takeEvery(SET_SIGNAL, send)
      const actual = generator.next().value
      expect(actual).toEqual(expected)
    })

    it('should call init', () => {
      const expected = call(init)
      const actual = generator.next().value
      expect(actual).toEqual(expected)
    })

    it('should be done', () => {
      const actual = generator.next().done
      expect(actual).toBe(true)
    })
  })

  describe('send', () => {
    const signal = 'rock!'
    const action = setSignal({ signal })
    const generator = send(action)

    // To test both yielded and unyielded methods on their own unit test we run next first.
    const actual = generator.next().value

    it('should throw and put sendSignalError', () => {
      const error = new Error('Oops!')
      const actual = generator.throw(error).value
      const expected = put(sendSignalError({ error: error.message }))
      expect(actual).toEqual(expected)
    })

    it('should set and send signal using signaling service', () => {
      expect(signaling.setSignal).toHaveBeenCalledWith(signal)
      expect(signaling.send).toHaveBeenCalledWith({ signal })
    })

    it('should put sendSignalSuccess', () => {
      const expected = put(sendSignalSuccess({ signal }))
      expect(actual).toEqual(expected)
    })

    it('should be done', () => {
      const actual = generator.next().done
      expect(actual).toBe(true)
    })
  })
})
