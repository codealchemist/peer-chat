import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { sendMessage } from 'store/chat/actions'
import { getMessages } from 'store/chat/selectors'
import { getUser } from 'store/user/selectors'
import styled from 'styled-components'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import CircularProgress from '@material-ui/core/CircularProgress'
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

class Chat extends React.PureComponent {
  state = {
    message: ''
  }

  onMessageChange = ({ target: { value } }) => {
    this.setState({ message: value })
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
  }

  render() {
    const { classes, sending, user, messages } = this.props
    return (
      <Wrapper>
        <Content>
          <Messages>
            <Notification
              text={`${user.name} created chat.`}
              date={new Date()}
            />
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
  messages: getMessages(state)
})

const mapActionsToProps = {
  sendMessage
}

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    mapActionsToProps
  )
)(Chat)
