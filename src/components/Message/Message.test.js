import React from 'react'
import { mount } from 'enzyme'
import Message from './Message'

describe('Message', () => {
  const user = { id: 42, name: 'Steve Vai', avatar: '7-string-guitar' }
  const text = 'For the love of God'
  const date = '2019-02-04T23:55:17.782Z'

  it('should render', () => {
    const wrapper = mount(<Message user={user} text={text} date={date} />)
    expect(wrapper).toMatchSnapshot()
  })
})
