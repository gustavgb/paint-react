import { Layer } from 'models/layer'

const defaultState = {
  currentLayer: -1,
  masterTimestamp: 0,
  width: 0,
  height: 0,
  layerOrder: '',
  layers: []
}

// const sortByIndex = (a, b) => {
//   if (a.index < b.index) {
//     return -1
//   } else if (a.index > b.index) {
//     return 1
//   }
//   return 0
// }

function canvasReducer (state = { ...defaultState }, action) {
  switch (action.type) {
    case 'NEW_IMAGE': {
      const { width, height } = action.payload
      const newLayer = new Layer(width, height, 0)
      return {
        ...state,
        currentLayer: 0,
        width,
        height,
        masterTimestamp: Date.now(),
        layers: [newLayer],
        layerOrder: newLayer.id
      }
    }
    default:
      return state
  }
}

export default canvasReducer
