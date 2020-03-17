import { Layer } from 'models/layer'

const defaultState = {
  currentLayer: -1,
  layers: []
}

function canvasReducer (state = { ...defaultState }, action) {
  switch (action.type) {
    case 'NEW_IMAGE': {
      const { width, height } = action.payload
      return {
        ...state,
        currentLayer: 0,
        layers: [
          new Layer(width, height, 0)
        ]
      }
    }
    default:
      return state
  }
}

export default canvasReducer
