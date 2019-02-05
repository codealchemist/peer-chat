import React from 'react'
import styled from 'styled-components'
import Icon from '@material-ui/core/Icon'
import IconButton from '@material-ui/core/IconButton'
import Notification from 'components/Notification'
import TextField from '@material-ui/core/TextField'
import Clipboard from 'react-clipboard.js'

export const Wrapper = styled.div`
  max-width: 640px;
  width: 100%;
  position: absolute;
  height: calc(100% - 20px);
  top: 0;

  @media (max-width: 800px) {
    max-width: 100%;
  }
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  padding: 20px 20px 0 20px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
`

export const Footer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`

export const Messages = styled.div`
  flex: 1;
  overflow: scroll;
`

export const StyledTextField = styled(TextField)`
  flex: 1;
`

export const StyledIconButton = styled(IconButton)`
  position: absolute;
  top: -1px;
  right: 10px;
`

export const InitiatorInitNotification = ({ user, shareUrl }) => {
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

export const PeerInitNotification = user => (
  <Notification text={`${user.name} joined chat.`} date={new Date()} />
)
