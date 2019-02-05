import styled from 'styled-components'

const backgroundColor = 'rgba(255, 255, 255, 0.5)'

export const Wrapper = styled.div`
  display: flex;
  margin-bottom: 5px;
`

export const Content = styled.div`
  width: 50%;
  display: flex;
  width: 100%;
  margin: 0 10px;
  justify-content: center;
`

export const Date = styled.div`
  position: absolute;
  top: 5px;
  left: 10px;

  p {
    color: #444;
    font-size: 0.75rem;
    font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
    font-weight: 400;
    letter-spacing: 0.03333em;
    margin: 0;
  }
`

export const Text = styled.div`
  width: 50%;
  background: ${backgroundColor};
  padding: 20px 10px 5px 10px;
  border-radius: 2px;
  min-width: 220px;
  position: relative;
  display: flex;
  justify-content: space-between;

  > p {
    color: #222;
    font-size: 0.85rem;
    font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
    font-weight: 400;
    margin: 0;
  }

  :before {
    content: '';
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 12px 0 12px 15px;
    border-color: transparent transparent transparent ${backgroundColor};
    position: absolute;
    top: 0;
    right: -15px;
    bottom: 0;
    margin: auto;
  }

  :after {
    content: '';
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 12px 15px 12px 0;
    border-color: transparent ${backgroundColor} transparent transparent;
    position: absolute;
    top: 0;
    left: -15px;
    bottom: 0;
    margin: auto;
  }
`

export const ActionButtonWrapper = styled.div`
  position: absolute;
  top: 2px;
  right: 0px;
`
