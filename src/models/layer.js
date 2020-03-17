export class Layer {
  constructor (width, height, index) {
    this.canvas = document.createElement('canvas')
    this.ctx = this.canvas.getContext('2d')

    this.width = width
    this.height = height

    this.index = index
  }

  resize () {
    console.warn('resize not implemented')
  }
}
