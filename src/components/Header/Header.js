import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  h1 {
    font-family: 'Playfair Display', serif;
  }

  ${({ type }) => {
    const styles = {
      subtleRight: `
        position: fixed;
        top: 22px;
        right: 20px;
        font-size: 10px;
        background: rgba(0,0,0,0.5);
        border-radius: 5px;
        padding: 3px 10px 6px;

        h1 {
          margin: 0;
        }

        @media (max-width: 560px) {
          font-size: 6px;
          top: 28px;
        }

        @media (max-width: 460px) {
          display: none;
        }
      `
    }

    if (!(type in styles)) return
    return styles[type]
  }}
`

const Header = ({ type }) => (
  <Wrapper type={type}>
    <h1>Chateer</h1>
  </Wrapper>
)

export default Header
