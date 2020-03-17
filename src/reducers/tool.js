const defaultState = {
  current: null
}

function toolReducer (state = { ...defaultState }, action) {
  switch (action.type) {
    case 'SELECT_TOOL':
      return {
        ...state,
        current: action.payload.tool
      }
    default:
      return state
  }
}

export default toolReducer
