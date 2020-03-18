export class Layer {
  constructor (width, height, id) {
    this.canvas = document.createElement('canvas')
    this.ctx = this.canvas.getContext('2d')

    this.width = this.canvas.width = width
    this.height = this.canvas.height = height

    this.id = id

    this.ctx.fillStyle = 'white'
    this.ctx.fillRect(0, 0, width, height)

    this.transportCanvas = document.createElement('canvas')
    this.transportCanvas.width = width
    this.transportCanvas.height = height
    this.transportCtx = this.transportCanvas.getContext('2d')
  }

  resize (width, height) {
    this.transportCanvas.width = this.width
    this.transportCanvas.height = this.height
    this.transportCtx.drawImage(this.canvas, 0, 0)

    this.width = this.canvas.width = width
    this.height = this.canvas.height = height

    this.ctx.drawImage(this.transportCanvas)
  }

  change (change) {
    this.ctx.drawImage(change, 0, 0)
  }
}
