import React from 'react'
import { mount } from 'enzyme'
import Background from './Background'

jest.mock('./Elements', () => ({
  Wrapper: 'div',
  Fade: 'div'
}))

describe('Background', () => {
  it('should render', () => {
    const wrapper = mount(<Background />)
    expect(wrapper).toMatchSnapshot()
  })
})
