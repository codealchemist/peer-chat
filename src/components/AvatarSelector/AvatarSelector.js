import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { setAvatar } from 'store/user/actions'
import { withStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Icon from '@material-ui/core/Icon'
import { Wrapper, IconsList, StyledIcon, styles } from './Elements'
import icons from './icons.json'

export class AvatarSelector extends React.PureComponent {
  state = {
    isModalOpen: false
  }

  openModal = () => {
    this.setState({ isModalOpen: true })
  }

  closeModal = () => {
    this.setState({ isModalOpen: false })
  }

  selectAvatar = avatar => {
    console.log('selected avatar', avatar)
    this.props.setAvatar({ avatar })
    this.closeModal()
  }

  render() {
    const { classes, avatar } = this.props
    return (
      <>
        <Wrapper id="open-modal-button" onClick={this.openModal}>
          <Icon style={{ fontSize: '50px' }}>{avatar}</Icon>
        </Wrapper>

        <Modal open={this.state.isModalOpen} onClose={this.closeModal}>
          <div className={classes.paper}>
            <h4>SELECT AVATAR</h4>
            <IconsList>
              {icons.map(icon => (
                <StyledIcon
                  key={icon}
                  style={{ fontSize: '50px' }}
                  onClick={() => this.selectAvatar(icon)}
                >
                  {icon}
                </StyledIcon>
              ))}
            </IconsList>
          </div>
        </Modal>
      </>
    )
  }
}

const mapStateToProps = state => ({
  avatar: state.user.avatar
})

const mapActionsToProps = {
  setAvatar
}

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    mapActionsToProps
  )
)(AvatarSelector)
