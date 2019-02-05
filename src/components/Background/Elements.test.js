import React from 'react'
import { mount } from 'enzyme'
import { Wrapper } from './Elements'

jest.mock('./getImage', () => () => ({
  default: 'rock-background.jpg'
}))

describe('Background / Elements', () => {
  it('should return wrapper with background image', () => {
    const wrapper = mount(<Wrapper />)
    expect(wrapper).toMatchSnapshot()
  })
})
