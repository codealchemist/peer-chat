import styled from 'styled-components'
import Card from '@material-ui/core/Card'

export const StyledCard = styled(Card)`
  h2 {
    margin: 0 0 10px;
  }

  p {
    margin: 30px 10px 10px;
  }
`

export const Form = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;

  @media (max-width: 1024px) {
    flex-direction: column;
  }
`
