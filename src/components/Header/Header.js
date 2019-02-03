import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  h1 {
    font-family: 'Playfair Display', serif;
  }
`

const Header = () => (
  <Wrapper>
    <h1>Peer Chat</h1>
  </Wrapper>
)

export default Header
