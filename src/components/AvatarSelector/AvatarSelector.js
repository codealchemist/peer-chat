import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { getAvatar } from 'store/user/selectors'
import { setAvatar } from 'store/user/actions'
import { withStyles } from '@material-ui/core/styles'
import Icon from '@material-ui/core/Icon'
import Modal from '@material-ui/core/Modal'

const icons = [
  'accessibility_new',
  'account_box',
  'account_circle',
  'android',
  'aspect_ratio',
  'autorenew',
  'backup',
  'bookmark',
  'bug_report',
  'build',
  'camera_enhance',
  'card_giftcard',
  'change_history',
  'check_circle',
  'code',
  'copyright',
  'credit_card',
  'dashboard',
  'description',
  'done',
  'drag_indicator',
  'eject',
  'euro_symbol',
  'explore',
  'extension',
  'face',
  'favorite',
  'fingerprint',
  'grade',
  'help',
  'home',
  'hourglass_empty',
  'https',
  'language',
  'lock',
  'lock_open',
  'motorcycle',
  'offline_bolt',
  'pan_tool',
  'pets',
  'power_settings_new',
  'pregnant_woman',
  'room',
  'rowing',
  'stars',
  'verified_user',
  'explicit',
  'flash_on'
]

const Wrapper = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    color: 'black',
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none',
    top: '20%',
    left: 0,
    right: 0,
    margin: 'auto'
  }
})

const IconsList = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const StyledIcon = styled(Icon)`
  cursor: pointer;
  :hover {
    color: white;
  }
`

class AvatarSelector extends React.PureComponent {
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
        <Wrapper onClick={this.openModal}>
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
