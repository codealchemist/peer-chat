import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import Header from 'components/Header'
import TextField from '@material-ui/core/TextField'
import Icon from '@material-ui/core/Icon'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  h2 {
    margin: 0 0 10px;
  }

  p {
    margin: 30px 10px 0;
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
  }
}

class WelcomePage extends React.PureComponent {
  state = {
    name: ''
  }

  onNameChange = ({ target: { value } }) => {
    console.log('Name changed', value)
    this.setState({ name: value })
  }

  render() {
    const { classes } = this.props
    return (
      <Wrapper>
        <Header />

        <Card className={classes.card}>
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
              <TextField
                id="name"
                label="Name"
                className={classes.textField}
                value={this.state.name}
                onChange={this.onNameChange}
                margin="normal"
                variant="outlined"
                autoFocus
              />
              <Button size="small">
                <Icon>keyboard_arrow_right</Icon>Create chat
              </Button>
            </Form>
          </CardContent>
        </Card>
      </Wrapper>
    )
  }
}

export default withStyles(styles)(WelcomePage)
