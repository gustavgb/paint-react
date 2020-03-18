import { Layer } from 'models/Layer'

export class CanvasState {
  constructor (width = 0, height = 0, currentLayer = 0) {
    this.layers = []
    this.width = width
    this.height = height
    this.currentLayer = currentLayer

    this.transportCanvas = document.createElement('canvas')
    this.transportCanvas.width = width
    this.transportCanvas.height = height
    this.transportCtx = this.transportCanvas.getContext('2d')
  }

  renderToCanvas (ctx) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    this.layers.forEach(layer => {
      ctx.drawImage(layer.canvas, 0, 0)
    })
  }

  setCurrentLayer (currentLayer) {
    this.currentLayer = currentLayer
  }

  setDimensions (width, height) {
    this.layers.forEach(layer => layer.resize(width, height))
    this.width = this.transportCanvas.width = width
    this.height = this.transportCanvas.height = height
  }

  declareLayers (layers) {
    this.layers = this.layers.filter(layer => layers.find(l => l.id === layer.id))
    const missing = layers.filter(layer => !this.layers.find(l => l.id === layer.id))

    missing.forEach(missingLayer => {
      const newLayer = new Layer(this.width, this.height, missingLayer.id)

      this.layers.push(newLayer)
    })
  }

  commit (canvas, callback) {
    this.transportCanvas.width = this.width
    this.transportCanvas.height = this.height
    this.transportCtx.drawImage(canvas, 0, 0)

    this.layers[this.currentLayer].change(this.transportCanvas)

    if (typeof callback === 'function') {
      callback()
    }
  }
}
