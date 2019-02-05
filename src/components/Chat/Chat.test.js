import React from 'react'
import { mount, shallow } from 'enzyme'
import Chat from './index'
import { Chat as Component } from './Chat'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

const _Date = Date
const date = new Date('2019-02-04T23:55:17.782Z')
global.Date = jest.fn(function () {
  return date
})
global.Date.now = () => 1549382820579
jest.mock('react-router-dom', () => ({
  withRouter: component => component
}))
jest.mock('moment', () => () => ({
  format: () => 'February 5th 2019, 12:24:29 pm'
}))

const mockStore = configureStore()

describe('Chat', () => {
  it('should render connected component without messages', () => {
    const store = mockStore({
      chat: {
        messages: [],
        writingNotifications: []
      },
      signaling: {
        isInitiator: true
      },
      user: {
        id: 42,
        name: 'Dude',
        avatar: 'metal'
      }
    })

    const wrapper = shallow(
      <Provider store={store}>
        <Chat />
      </Provider>
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('should render connected component with messages', () => {
    const store = mockStore({
      chat: {
        messages: [
          {
            user: { id: 42, avatar: 'metal', name: 'Dude' },
            text: 'How are you doing?',
            date: new Date('2019-02-04T23:55:17.782Z'),
            type: 'own'
          },
          {
            user: { id: 86, avatar: 'rock', name: 'David Gilmour' },
            text: 'Confortably numb.',
            date: new Date('2019-02-04T23:55:27.782Z'),
            type: 'peer'
          }
        ],
        writingNotifications: []
      },
      signaling: {
        isInitiator: true
      },
      user: {
        id: 42,
        name: 'Dude',
        avatar: 'metal'
      }
    })

    const wrapper = mount(
      <Provider store={store}>
        <Chat />
      </Provider>
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('should render connected component with writing notifications', () => {
    const store = mockStore({
      chat: {
        messages: [],
        writingNotifications: [
          {
            user: { id: 86, avatar: 'rock', name: 'David Gilmour' },
            date: new Date('2019-02-04T23:55:32.782Z')
          }
        ]
      },
      signaling: {
        isInitiator: true
      },
      user: {
        id: 42,
        name: 'Dude',
        avatar: 'metal'
      }
    })

    const wrapper = mount(
      <Provider store={store}>
        <Chat />
      </Provider>
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('should redirect to /', () => {
    const store = mockStore({
      chat: {
        messages: [],
        writingNotifications: []
      },
      signaling: {
        isInitiator: true
      },
      user: {}
    })

    const history = {
      push: jest.fn()
    }

    const wrapper = mount(
      <Provider store={store}>
        <Chat history={history} />
      </Provider>
    )

    expect(wrapper).toMatchSnapshot()
    expect(history.push).toHaveBeenCalledWith('/')
  })

  it('should not redirect to /', () => {
    const store = mockStore({
      chat: {
        messages: [],
        writingNotifications: []
      },
      signaling: {
        isInitiator: true
      },
      user: {
        id: 42,
        name: 'Dude',
        avatar: 'metal'
      }
    })

    const history = {
      push: jest.fn()
    }

    const wrapper = mount(
      <Provider store={store}>
        <Chat history={history} />
      </Provider>
    )

    expect(wrapper).toMatchSnapshot()
    expect(history.push).not.toHaveBeenCalledWith('/')
  })

  it('should schedule writing notification', () => {
    const user = {
      id: 42,
      name: 'Dude',
      avatar: 'metal'
    }

    const component = new Component()
    component.setState = jest.fn()
    window.setTimeout = callback => callback()
    component.props = {
      user,
      sendWritingNotification: jest.fn()
    }

    const event = { target: { value: 'John Connor' } }
    component.onMessageChange(event)

    expect(component.setState).toHaveBeenCalledWith({
      message: event.target.value
    })

    expect(component.props.sendWritingNotification).toHaveBeenCalledWith(user)
  })

  it('should clear scheduled writing notification', () => {
    const user = {
      id: 42,
      name: 'Dude',
      avatar: 'metal'
    }

    const component = new Component()
    component.setState = jest.fn()
    window.setTimeout = callback => callback()
    component.props = {
      user,
      sendClearWritingNotification: jest.fn()
    }

    const event = { target: { value: '' } }
    component.onMessageChange(event) // Will schedule

    expect(component.props.sendClearWritingNotification).toHaveBeenCalledWith(
      user
    )
  })
})
