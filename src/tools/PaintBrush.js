import Tool from 'tools/BaseTool'

class PaintBrush extends Tool {
  constructor () {
    super('PaintBrush')

    this.state = {
      lastX: 0,
      lastY: 0,
      active: false
    }
  }

  mouseDown (x, y, ctx) {
    this.state.lastX = x
    this.state.lastY = y
    this.state.active = true

    this.point(ctx, this.state.lastX, this.state.lastY)
  }

  mouseMove (x, y, ctx) {
    if (this.state.active) {
      this.stroke(ctx, this.state.lastX, this.state.lastY, x, y)

      this.state.lastX = x
      this.state.lastY = y
    }
  }

  mouseUp (x, y, ctx, actions) {
    if (this.state.active) {
      this.state.active = false

      this.stroke(ctx, this.state.lastX, this.state.lastY, x, y)

      actions.commit()
    }
  }

  stroke (ctx, sx, sy, ex, ey) {
    ctx.beginPath()
    ctx.moveTo(sx, sy)
    ctx.lineTo(ex, ey)
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.lineWidth = 10
    ctx.strokeStyle = 'black'
    ctx.stroke()
  }

  point (ctx, x, y) {
    ctx.beginPath()
    ctx.arc(x, y, 5, 0, 2*Math.PI, false)
    ctx.fillStyle = 'black'
    ctx.fill()
  }
}

export default PaintBrush
