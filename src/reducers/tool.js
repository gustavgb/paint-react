import * as tools from 'models/tools'

const defaultState = {
  current: 0,
  catalogue: [...tools]
}

function toolReducer (state = { ...defaultState }, action) {
  switch (action.type) {
    default:
      return state
  }
}

export default toolReducer
