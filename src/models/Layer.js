export class Layer {
  constructor (width, height, id) {
    this.canvas = document.createElement('canvas')
    this.ctx = this.canvas.getContext('2d')

    this.width = this.canvas.width = width
    this.height = this.canvas.height = height

    this.id = id
    this.timestamp = 0

    this.ctx.fillStyle = 'white'
    this.ctx.fillRect(0, 0, width, height)
  }

  resize () {
    console.warn('resize not implemented')
  }

  change (change) {
    this.ctx.drawImage(change, 0, 0)
    this.timestamp = Date.now()
  }
}
