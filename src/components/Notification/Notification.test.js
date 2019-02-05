import React from 'react'
import { mount } from 'enzyme'
import Notification from './Notification'

const _Date = Date
const date = new Date('2019-02-04T23:55:17.782Z')
global.Date = jest.fn(function () {
  return date
})
global.Date.now = () => 1549382820579

describe('Notification', () => {
  it('should render', () => {
    const wrapper = mount(<Notification />)
    expect(wrapper).toMatchSnapshot()
  })
})
