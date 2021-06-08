import { createStore, applyMiddleware } from 'redux'
import { isDev } from 'utils/tools'

import thunk from 'redux-thunk'
import logger from 'redux-logger'
import reducer from './reducer'

const middlewares = [thunk]
if (isDev) {
  middlewares.push(logger)
}


const store = createStore(reducer, applyMiddleware(...middlewares))
export default store
