import styled from 'styled-components'
import Icon from '@material-ui/core/Icon'

export const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    maxWidth: '80%',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    color: 'black',
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none',
    top: '20%',
    left: 0,
    right: 0,
    margin: 'auto',
    textAlign: 'center'
  }
})

export const Wrapper = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`

export const IconsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`

export const StyledIcon = styled(Icon)`
  cursor: pointer;
  :hover {
    color: white;
  }
`
