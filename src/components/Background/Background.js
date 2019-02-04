import React from 'react'
import styled from 'styled-components'

export const getImage = () => {
  const min = 1
  const max = 33
  const i = Math.floor(Math.random() * (max - min + 1)) + min
  const image = require(`./background${i}.jpg`)
  return image
}

const Wrapper = styled.div`
  background: url(${getImage()}) no-repeat;
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -1;
  filter: blur(5px);
`

const Fade = styled.div`
  width: 100%;
  height: 100%;
  background: black;
  opacity: 0.7;
`

const Background = () => (
  <Wrapper>
    <Fade />
  </Wrapper>
)

export default Background
