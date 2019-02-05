import React from 'react'
import { mount } from 'enzyme'
import Avatar from './Avatar'

describe('Avatar', () => {
  it('should render', () => {
    const wrapper = mount(<Avatar avatar="rock" />)
    expect(wrapper).toMatchSnapshot()
  })
})
