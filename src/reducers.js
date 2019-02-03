import { combineReducers } from 'redux'
import welcome from './store/welcome/reducer'
import chat from './store/chat/reducer'
import signaling from './store/signaling/reducer'
import peers from './store/peers/reducer'

const reducers = combineReducers({
  welcome,
  chat,
  signaling,
  peers
})

export default reducers
