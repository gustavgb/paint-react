export const newImage = (width, height) => ({
  type: 'NEW_IMAGE',
  payload: {
    width,
    height
  }
})

export const commitChange = (change) => (dispatch, getState) => {
  const currentLayer = getState().canvas.currentLayer

  dispatch({
    type: 'COMMIT_CHANGE',
    payload: {
      change,
      layerIndex: currentLayer
    }
  })
}
