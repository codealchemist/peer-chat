import React from 'react'
import { mount } from 'enzyme'
import ChatPage from './ChatPage'

jest.mock('components/Chat', () => 'div')

describe('ChatPage', () => {
  it('should render', () => {
    const wrapper = mount(<ChatPage />)
    expect(wrapper).toMatchSnapshot()
  })
})
