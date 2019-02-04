import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { setName } from 'store/user/actions'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import AvatarSelector from 'components/AvatarSelector'
import CircularProgress from '@material-ui/core/CircularProgress'

const StyledCard = styled(Card)`
  h2 {
    margin: 0 0 10px;
  }

  p {
    margin: 30px 10px 10px;
  }
`

const Form = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;

  @media (max-width: 1024px) {
    flex-direction: column;
  }
`

const StyledText = styled(Typography)`
  margin: 0 0 10px;
`

const styles = {
  card: {
    minWidth: 300,
    width: '40%',
    background: 'rgba(0,0,0,0.5)'
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12
  },
  buttonContainer: {
    position: 'relative'
  }
}

class Welcome extends React.PureComponent {
  state = {
    name: '',
    openingChat: false
  }

  onNameChange = ({ target: { value } }) => {
    this.setState({ name: value })
  }

  createChat = () => {
    console.log('== create chat ==')
    this.setState({ openingChat: true })
    this.props.setName({ name: this.state.name })
    this.props.history.push('/chat')
  }

  render() {
    const { classes } = this.props
    return (
      <StyledCard className={classes.card}>
        <CardContent>
          <Typography variant="h5" component="h2">
            Welcome!
          </Typography>
          <Typography color="textSecondary">
            <b>Peer Chat</b> is a peer to peer chat application that uses{' '}
            <b>WebRTC data channels</b> to send messages between peers.
          </Typography>
          <Typography component="p">Let's create a new chat!</Typography>

          <Form>
            <AvatarSelector />
            <TextField
              id="name"
              label="Name"
              value={this.state.name}
              onChange={this.onNameChange}
              margin="normal"
              variant="outlined"
              autoFocus
            />
            <div className={classes.buttonContainer}>
              <Button
                variant="contained"
                color="primary"
                disabled={!this.state.name || this.state.openingChat}
                onClick={this.createChat}
              >
                Create chat
              </Button>
              {this.state.openingChat && (
                <CircularProgress
                  size={24}
                  className={classes.buttonProgress}
                />
              )}
            </div>
          </Form>
        </CardContent>
      </StyledCard>
    )
  }
}

const mapActionsToProps = { setName }

export default compose(
  withStyles(styles),
  connect(
    null,
    mapActionsToProps
  ),
  withRouter
)(Welcome)
