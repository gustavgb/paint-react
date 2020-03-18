import Layer from 'models/Layer'

export class CanvasState {
  constructor (width, height, currentLayer = 0) {
    this.layers = []
    this.width = width
    this.height = height
    this.currentLayer = currentLayer

    this.transportCanvas = document.createElement('canvas')
    this.transportCanvas.width = this.ctx.canvas.width
    this.transportCanvas.height = this.ctx.canvas.height
    this.transportCtx = this.transportCanvas.getContext('2d')
  }

  static renderCanvas (ctx) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    this.layers.forEach(layer => {
      ctx.drawImage(layer, 0, 0)
    })
  }

  setCurrentLayer (currentLayer) {
    this.currentLayer = currentLayer
  }

  declareLayers (layers) {
    const missing = layers.filter(layer => !this.layers.find(l => l.id === layer.id))

    console.log(missing)

    missing.forEach(missingLayer => {
      const newLayer = new Layer(this.width, this.height, missingLayer.id)

      this.layers.push(newLayer)
    })
  }

  commit (canvas, callback) {
    this.transportCtx.clearRect(0, 0, this.transportCanvas.width, this.transportCanvas.height)
    this.transportCtx.drawImage(canvas, 0, 0)

    this.layers[this.currentLayer].change(this.transportCanvas)


    if (typeof callback === 'function') {
      callback()
    }
  }
}
