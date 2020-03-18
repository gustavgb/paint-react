export const newImage = (width, height) => ({
  type: 'NEW_IMAGE',
  payload: {
    width,
    height
  }
})

export const updateTimestamp = () => ({
  type: 'UPDATE_TIMESTAMP'
})
