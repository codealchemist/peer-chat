import styled from 'styled-components'
import getImage from './getImage'

export const Wrapper = styled.div`
  background: url(${getImage()}) no-repeat;
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: -1;
  filter: blur(5px);
`

export const Fade = styled.div`
  width: 100%;
  height: 100%;
  background: black;
  opacity: 0.7;
`
