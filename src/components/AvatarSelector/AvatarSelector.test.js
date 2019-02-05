import React from 'react'
import { mount, shallow } from 'enzyme'
import AvatarSelector from './index'
import { AvatarSelector as Component } from './AvatarSelector'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

const mockStore = configureStore()
const store = mockStore({
  user: {
    avatar: 'rock-it'
  }
})

describe('AvatarSelector', () => {
  it('should render connected component', () => {
    const wrapper = mount(
      <Provider store={store}>
        <AvatarSelector />
      </Provider>
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('should open modal', () => {
    const classes = {
      paper: {}
    }
    const wrapper = shallow(<Component classes={classes} />)

    const instance = wrapper.instance()
    instance.setState = jest.fn()

    const iconButton = wrapper.find('#open-modal-button')
    iconButton.simulate('click')
    expect(instance.setState).toHaveBeenCalledWith({ isModalOpen: true })
  })

  it('should close modal', () => {
    const classes = {
      paper: {}
    }
    const wrapper = shallow(<Component classes={classes} />)

    const instance = wrapper.instance()
    instance.setState = jest.fn()
    instance.closeModal()
    expect(instance.setState).toHaveBeenCalledWith({ isModalOpen: false })
  })

  it('should select avatar and close modal', () => {
    const classes = {
      paper: {}
    }
    const wrapper = shallow(
      <Component classes={classes} setAvatar={jest.fn()} />
    )

    const instance = wrapper.instance()
    instance.setState = jest.fn()
    instance.selectAvatar('jazz')
    expect(instance.props.setAvatar).toHaveBeenCalledWith({ avatar: 'jazz' })
    expect(instance.setState).toHaveBeenCalledWith({ isModalOpen: false })
  })
})
