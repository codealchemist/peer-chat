import styled from 'styled-components'
import Icon from '@material-ui/core/Icon'

export const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    maxWidth: '95%',
    color: 'black',
    boxShadow: theme.shadows[5],
    outline: 'none',
    top: '20%',
    left: 0,
    right: 0,
    margin: 'auto',
    textAlign: 'center',
    height: 'calc(80% - 10px)',
    overflow: 'scroll'
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

export const ModalContent = styled.div`
  background: rgba(255, 255, 255, 0.8);
  padding: 10px;
`

export const Title = styled.h4`
  margin-top: 0;
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
