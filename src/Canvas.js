import React, { Component } from 'react'
import { makeStyles } from '@material-ui/styles'
import { connect } from 'react-redux'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1
  },
  canvas: {
    border: '1px solid black'
  }
}))

const contexts = {}

const CanvasRenderer = React.forwardRef((props, ref) => {
  const classes = useStyles()
  const { layers } = props

  return (
    <div className={classes.root} ref={ref}>
      {layers.map(layer => (
        <canvas
          key={layer.id}
          width={layer.width}
          height={layer.height}
          className={classes.canvas}
          ref={node => { if (node) contexts[layer.id] = node.getContext('2d') }}
        />
      ))}
    </div>
  )
})

class CanvasContainer extends Component {
  constructor (props) {
    super(props)

    this._mouseDown = this.mouseDown.bind(this)
    this._mouseMove = this.mouseMove.bind(this)
    this._mouseUp = this.mouseUp.bind(this)

    this.element = React.createRef()
  }

  componentDidMount () {
    const node = this.element.current
    if (node) {
      node.addEventListener('mousedown', this._mouseDown)
      node.addEventListener('mousemove', this._mouseMove)
      node.addEventListener('mouseup', this._mouseUp)
    }

    this.updateContexts()
  }

  componentWillUnmount () {
    const node = this.element.current
    if (node) {
      node.removeEventListener('mousedown', this._mouseDown)
      node.removeEventListener('mousemove', this._mouseMove)
      node.removeEventListener('mouseup', this._mouseUp)
    }
  }

  componentDidUpdate (prevProps) {
    if (prevProps.canvas.masterTimestamp < this.props.canvas.masterTimestamp) {
      this.updateContexts(prevProps)
    }
  }

  updateContexts (prevProps) {
    this.props.canvas.layers.forEach(layer => {
      const ctx = contexts[layer.id]

      if (!prevProps) {
        ctx.drawImage(layer.canvas, 0, 0)
      } else {
        const lastLayer = prevProps.canvas.layers.find(l => l.id === layer.id)

        if (!lastLayer || lastLayer.timestamp < layer.timestamp) {
          ctx.drawImage(layer.canvas, 0, 0)
        }
      }
    })
  }

  mouseDown () {

  }

  mouseMove () {

  }

  mouseUp () {

  }

  render () {
    return (
      <CanvasRenderer
        layers={this.props.canvas.layers}
        ref={this.element}
      />
    )
  }
}

export default connect(
  state => ({
    canvas: state.canvas
  })
)(CanvasContainer)
