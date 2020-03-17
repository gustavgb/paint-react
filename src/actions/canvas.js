export const newImage = (width, height) => ({
  type: 'NEW_IMAGE',
  payload: {
    width,
    height
  }
})
