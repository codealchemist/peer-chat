import { combineReducers } from 'redux'
import chat from 'store/chat/reducer'
import signaling from 'store/signaling/reducer'
import peers from 'store/peers/reducer'
import user from 'store/user/reducer'

const reducers = combineReducers({
  chat,
  signaling,
  peers,
  user
})

export default reducers
