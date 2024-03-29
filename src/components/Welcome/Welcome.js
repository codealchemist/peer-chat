import React from 'react'
import nanoid from 'nanoid'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { setName, setId as setUserId } from 'store/user/actions'
import { withRouter } from 'react-router-dom'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import AvatarSelector from 'components/AvatarSelector'
import CircularProgress from '@material-ui/core/CircularProgress'
import { StyledCard, Form } from './Elements'

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
  userId = nanoid(12)
  state = {
    name: '',
    openingChat: false
  }

  componentDidMount () {
    this.props.setUserId({ id: this.userId })
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

  onKey = ({ key }) => {
    if (key !== 'Enter' || !this.state.name.trim()) return
    this.createChat()
  }

  render () {
    const { classes, location } = this.props
    return (
      <StyledCard className={classes.card}>
        <CardContent>
          <Typography variant="h5" component="h2">
            Welcome!
          </Typography>
          <Typography color="textSecondary">
            <b>Chateer</b> is a peer to peer chat application that uses{' '}
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
              onKeyPress={this.onKey}
              rowsMax="1"
              inputProps={{
                maxLength: 20
              }}
              multiline
              autoFocus
            />
            <div className={classes.buttonContainer}>
              <Button
                variant="contained"
                color="primary"
                disabled={!this.state.name.trim() || this.state.openingChat}
                onClick={this.createChat}
              >
                { location?.hash !== '' ? 'Join chat' : 'Create chat' }
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

const mapActionsToProps = { setName, setUserId }

export default compose(
  withStyles(styles),
  connect(
    null,
    mapActionsToProps
  ),
  withRouter
)(Welcome)
