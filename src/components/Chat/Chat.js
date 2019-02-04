import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'redux'
import Clipboard from 'react-clipboard.js'
import {
  sendMessage,
  sendWritingNotification,
  sendClearWritingNotification
} from 'store/chat/actions'
import { getMessages, getWritingNotifications } from 'store/chat/selectors'
import { getIsInitiator, getShareUrl } from 'store/signaling/selectors'
import { getUser } from 'store/user/selectors'
import styled from 'styled-components'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import CircularProgress from '@material-ui/core/CircularProgress'
import LinearProgress from '@material-ui/core/LinearProgress'
import Icon from '@material-ui/core/Icon'
import IconButton from '@material-ui/core/IconButton'
import Message from 'components/Message'
import Notification from 'components/Notification'

const Wrapper = styled.div`
  max-width: 640px;
  width: 100%;
  position: absolute;
  height: calc(100% - 90px);
  top: 70px;

  @media (max-width: 800px) {
    max-width: 100%;
  }
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  padding: 20px 20px 0 20px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
`

const Footer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`

const Header = styled.div`
  width: 100%;
`

const Messages = styled.div`
  flex: 1;
  overflow: scroll;
`

const StyledText = styled(TextField)`
  flex: 1;
`

const styles = {
  progress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12
  }
}

const InitiatorNotificationWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`

const StyledIconButton = styled(IconButton)`
  position: absolute;
  top: -1px;
  right: 10px;
`

const InitiatorInitNotification = ({ user, shareUrl }) => {
  const ActionButton = (
    <Clipboard data-clipboard-text={shareUrl} component="a">
      <StyledIconButton id="share-link">
        <Icon style={{ fontSize: '16px' }}>insert_link</Icon>
      </StyledIconButton>
    </Clipboard>
  )

  return (
    <Notification
      text={`${user.name} created chat.`}
      date={new Date()}
      actionButton={ActionButton}
    />
  )
}

const PeerInitNotification = user => (
  <Notification text={`${user.name} joined chat.`} date={new Date()} />
)

class Chat extends React.PureComponent {
  writingNotificationTimeout = null
  writingNotificationDelay = 3 // Seconds.

  state = {
    message: ''
  }

  componentDidMount() {
    // Redirect to welcome page if user not set.
    const { user, history, isInitiator, shareUrl } = this.props
    if (!user.id) {
      return history.push('/')
    }
  }

  scheduleWritingNotification(value) {
    // Clear writing notification if the user cleared the message.
    // Also send a clearWritingNotification message to remote peer.
    if (!value) {
      const { sendClearWritingNotification, user } = this.props
      clearTimeout(this.writingNotificationTimeout)
      this.writingNotificationTimeout = null
      sendClearWritingNotification(user)
      return
    }

    // Avoid scheduling a writing notification if we already did.
    if (this.writingNotificationTimeout) return

    // Schedule writing notification.
    console.log('Schedule writing notification...')
    this.writingNotificationTimeout = setTimeout(() => {
      const { user, sendWritingNotification } = this.props
      sendWritingNotification(user)
    }, 1000 * this.writingNotificationDelay)
  }

  onMessageChange = ({ target: { value } }) => {
    this.setState({ message: value })
    this.scheduleWritingNotification(value)
  }

  onKey = ({ key }) => {
    if (key !== 'Enter') return

    const { user, sendMessage } = this.props
    sendMessage({
      user,
      text: this.state.message,
      date: new Date(),
      type: 'own'
    })
    this.setState({ message: '' })

    // Clear writing notification.
    clearTimeout(this.writingNotificationTimeout)
    this.writingNotificationTimeout = null
  }

  getInitNofication() {
    const { user, isInitiator, shareUrl } = this.props
    if (isInitiator) return InitiatorInitNotification({ user, shareUrl })
    return PeerInitNotification(user)
  }

  render() {
    const {
      classes,
      sending,
      user,
      messages,
      notifications,
      isInitiator
    } = this.props
    return (
      <Wrapper>
        <Content>
          <Messages>
            {this.getInitNofication()}
            {/* <Message
              user={{ name: 'Bert', avatar: 'photo_camera' }}
              text="Yo!"
              date={new Date()}
              type="own"
            />
            <Message
              user={{ name: 'Jane', avatar: 'stars' }}
              text="Hi!"
              date={new Date()}
              type="peer"
            /> */}
            {messages.map((message, i) => (
              <Message
                key={`message-${i}`}
                user={message.user}
                text={message.text}
                date={message.date}
                type={message.type}
              />
            ))}

            {notifications.map(notification => (
              <Message
                key={notification.user.id}
                user={notification.user}
                text={<LinearProgress />}
                date={notification.date}
                type="peer"
              />
            ))}
          </Messages>

          <Footer>
            <StyledText
              id="name"
              label="Message"
              value={this.state.message}
              onChange={this.onMessageChange}
              onKeyPress={this.onKey}
              margin="normal"
              autoFocus
            />
            {sending && (
              <CircularProgress size={24} className={classes.progress} />
            )}
          </Footer>
        </Content>
      </Wrapper>
    )
  }
}

const mapStateToProps = state => ({
  user: getUser(state),
  messages: getMessages(state),
  notifications: getWritingNotifications(state),
  isInitiator: getIsInitiator(state),
  shareUrl: getShareUrl(state)
})

const mapActionsToProps = {
  sendMessage,
  sendWritingNotification,
  sendClearWritingNotification
}

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    mapActionsToProps
  ),
  withRouter
)(Chat)
