import styled from 'styled-components'

const initiatorBackgroundColor = 'rgba(150, 150, 150, 0.2)'
const peerBackgroundColor = 'rgba(150, 150, 255, 0.2)'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row-reverse;
  margin-bottom: 5px;

  ${({ type }) => {
    if (type === 'peer') {
      return `
        flex-direction: row;
      `
    }
  }}
`

export const Content = styled.div`
  width: 50%;
  display: flex;
  width: 100%;
  margin: 0 10px;
  justify-content: flex-end;

  ${({ type }) => {
    if (type === 'peer') {
      return `
        justify-content: flex-start;
      `
    }

    if (type === 'notification') {
      return `
        justify-content: center;
      `
    }
  }}
`

export const Date = styled.div`
  position: absolute;
  top: 5px;
  left: 10px;

  p {
    color: #aaa;
    font-size: 0.75rem;
    font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
    font-weight: 400;
    letter-spacing: 0.03333em;
    margin: 0;
  }
`

export const Text = styled.div`
  width: 50%;
  background: ${initiatorBackgroundColor};
  color: #eee;
  padding: 20px 10px 5px 10px;
  border-radius: 5px;
  min-width: 220px;
  position: relative;
  word-break: break-word;

  > p {
    word-break: break-word;
  }

  :before {
    content: '';
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 5px 0 5px 7px;
    border-color: transparent transparent transparent
      ${initiatorBackgroundColor};
    position: absolute;
    top: 9px;
    right: -7px;

    ${({ type }) => {
    if (type === 'peer') {
      return `
          border-width: 5px 7px 5px 0;
          border-color: transparent ${peerBackgroundColor} transparent transparent;
          left: -7px;
        `
    }

    if (type === 'notification') {
      return `
        display: none;
      `
    }
  }}
  }

  ${({ type }) => {
    if (type === 'peer') {
      return `
        background: ${peerBackgroundColor};
      `
    }

    if (type === 'notification') {
      return `
        background: rgba(0, 0, 0, 0.2);
      `
    }
  }}
`
