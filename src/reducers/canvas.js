import { v4 as uuid } from 'uuid'

const defaultState = {
  currentLayer: -1,
  masterTimestamp: 0,
  width: 0,
  height: 0,
  layers: []
}

function createLayer () {
  return {
    id: uuid()
  }
}

function canvasReducer (state = { ...defaultState }, action) {
  switch (action.type) {
    case 'NEW_IMAGE': {
      const { width, height } = action.payload
      return {
        ...state,
        currentLayer: 0,
        width,
        height,
        masterTimestamp: Date.now(),
        layers: [createLayer()]
      }
    }
    case 'UPDATE_TIMESTAMP': {
      return {
        ...state,
        masterTimestamp: Date.now()
      }
    }
    default:
      return state
  }
}

export default canvasReducer
