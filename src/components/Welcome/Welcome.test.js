import React from 'react'
import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import Welcome from './Welcome'

jest.mock('react-router-dom', () => ({
  withRouter: component => component
}))
const mockStore = configureStore()
const store = mockStore({
  user: {
    id: null,
    name: null,
    avatar: 'surfing-with-the-alien'
  }
})

describe('Welcome', () => {
  it('should render', () => {
    const wrapper = mount(
      <Provider store={store}>
        <Welcome />
      </Provider>
    )
    expect(wrapper).toMatchSnapshot()
  })
})
