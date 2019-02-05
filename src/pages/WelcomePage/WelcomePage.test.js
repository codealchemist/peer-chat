import React from 'react'
import { mount } from 'enzyme'
import WelcomePage from './WelcomePage'

jest.mock('components/Welcome', () => 'div')

describe('WelcomePage', () => {
  it('should render', () => {
    const wrapper = mount(<WelcomePage />)
    expect(wrapper).toMatchSnapshot()
  })
})
