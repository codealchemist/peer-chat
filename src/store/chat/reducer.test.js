import reducer from './reducer'
import {
  addMessage,
  addWritingNotification,
  removeWritingNotification
} from './actions'

describe('Chat reducer', () => {
  const user = {
    id: 42,
    name: 'John Petrucci',
    avatar: 'awesome'
  }
  const date = '2019-02-05T19:04:27.891Z'

  it('should add message', () => {
    const action = addMessage({ message: 'Rock!' })
    const actual = reducer(undefined, action)
    const expected = {
      messages: [{ message: 'Rock!' }],
      writingNotifications: []
    }
    expect(actual).toEqual(expected)
  })

  it('should add writing notification', () => {
    const action = addWritingNotification({ user, date })
    const actual = reducer(undefined, action)
    const expected = {
      messages: [],
      writingNotifications: [
        {
          date: '2019-02-05T19:04:27.891Z',
          user: { avatar: 'awesome', id: 42, name: 'John Petrucci' }
        }
      ]
    }
    expect(actual).toEqual(expected)
  })

  it('should remove writing notification', () => {
    const state = {
      messages: [],
      writingNotifications: [
        {
          date: '2019-02-05T19:04:27.891Z',
          user: { avatar: 'awesome', id: 42, name: 'John Petrucci' }
        }
      ]
    }
    const action = removeWritingNotification({ user })
    const actual = reducer(state, action)
    const expected = {
      messages: [],
      writingNotifications: []
    }
    expect(actual).toEqual(expected)
  })
})
