import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import toolReducer from 'reducers/tool'
import thunk from 'redux-thunk'
import canvasReducer from 'reducers/canvas'

const reducer = combineReducers({
  canvas: canvasReducer,
  tool: toolReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = window.store = createStore(reducer, /* preloadedState, */ composeEnhancers(
  applyMiddleware(thunk)
))

export default store
