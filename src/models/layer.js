import { v4 as uuid } from 'uuid'

export class Layer {
  constructor (width, height, index) {
    this.canvas = document.createElement('canvas')
    this.ctx = this.canvas.getContext('2d')

    this.width = this.canvas.width = width
    this.height = this.canvas.height = height

    this.index = index
    this.id = uuid()
    this.timestamp = 0

    this.ctx.fillStyle = 'blue'
    this.ctx.fillRect(0, 0, this.width, this.height)
  }

  resize () {
    console.warn('resize not implemented')
  }
}
