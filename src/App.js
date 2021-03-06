import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import styled from 'styled-components'

import WelcomePage from './pages/WelcomePage'
import ChatPage from './pages/ChatPage'
import store from './store'
import Background from 'components/Background'

const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  },
  palette: {
    type: 'dark'
  }
})

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const App = () => (
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <Background />

      <Wrapper>
        <Router>
          <>
            <Route path="/" exact component={WelcomePage} />
            <Route path="/chat" component={ChatPage} />
          </>
        </Router>
      </Wrapper>
    </Provider>
  </MuiThemeProvider>
)

export default App
