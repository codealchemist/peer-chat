import { all, fork } from 'redux-saga/effects'
import signaling from './store/signaling/sagas'
import peers from './store/peers/sagas'

export default function * saga () {
  console.log('load sagas')
  yield all([fork(peers), fork(signaling)])
}
