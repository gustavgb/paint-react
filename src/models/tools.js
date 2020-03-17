export class Tool {
  constructor (name) {
    this.name = name
  }
}

export class PaintBrush extends Tool {
  constructor (ctx, element) {
    super('PaintBrush')

    this.ctx = ctx
    this.element = element

    this.state = {
      x: 0,
      y: 0,
      rect: {x: 0, y: 0},
      active: false
    }
  }

  mouseDown (e) {
    const rect = this.element.getBoundingClientRect()

    this.state.rect = rect
    this.state.lastX = e.clientX - rect.x
    this.state.lastY = e.clientY - rect.y
    this.state.active = true

    this.point(this.state.lastX, this.state.lastY)
  }

  mouseMove (e) {
    if (this.state.active) {
      this.state.x = e.clientX - this.state.rect.x
      this.state.y = e.clientY - this.state.rect.y

      this.stroke(this.state.lastX, this.state.lastY, this.state.x, this.state.y)

      this.state.lastX = this.state.x
      this.state.lastY = this.state.y
    }
  }

  mouseUp (e) {
    if (this.state.active) {
      this.state.x = e.clientX - this.state.rect.x
      this.state.y = e.clientY - this.state.rect.y
      this.state.active = false

      this.stroke(this.state.lastX, this.state.lastY, this.state.x, this.state.y)
    }
  }

  stroke (sx, sy, ex, ey) {
    const ctx = this.ctx
    ctx.beginPath()
    ctx.moveTo(sx, sy)
    ctx.lineTo(ex, ey)
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.lineWidth = 10
    ctx.strokeStyle = 'black'
    ctx.stroke()
  }

  point (x, y) {
    const ctx = this.ctx
    ctx.beginPath()
    ctx.arc(x, y, 5, 0, 2*Math.PI, false)
    ctx.fillStyle = 'black'
    ctx.fill()
  }
}
