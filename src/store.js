import { createStore, combineReducers, applyMiddleware } from 'redux'
import layersReducer from 'reducers/layers'
import toolReducer from 'reducers/tool'
import thunk from 'redux-thunk'

const reducer = combineReducers({
  layers: layersReducer,
  tool: toolReducer,
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store
