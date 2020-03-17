import React, { Component } from 'react'
import { makeStyles } from '@material-ui/styles'
import { connect } from 'react-redux'
import { PaintBrush } from 'models/tools'
import { selectTool } from 'actions/tool'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1
  },
  canvasContainer: {
    border: '1px solid black',
    position: 'relative',
    '& > *': {
      position: 'absolute',
      left: 0,
      top: 0
    }
  }
}))

const contexts = {}

const Canvas = ({ layer, index }) => (
  <canvas
    width={layer.width}
    height={layer.height}
    ref={node => { if (node) contexts[layer.id] = node.getContext('2d') }}
    style={{ position: index > 0 ? 'absolute' : 'static' }}
  />
)

const CanvasRenderer = React.forwardRef((props, ref) => {
  const classes = useStyles()
  const { layers, currentLayer, tempCanvas } = props

  return (
    <div className={classes.root}>
      <div ref={ref} className={classes.canvasContainer}>
        {layers
          .filter((l, index) => index <= currentLayer)
          .map((layer, index) => <Canvas key={layer.id} layer={layer} index={index} />)
        }
        {tempCanvas}
        {layers
          .filter((l, index) => index > currentLayer)
          .map((layer, index) => <Canvas key={layer.id} layer={layer} index={index} />)
        }
      </div>
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
    this.canvasEl = React.createRef()
  }

  componentDidMount () {
    const node = this.element.current
    if (node) {
      node.addEventListener('mousedown', this._mouseDown)
      node.addEventListener('mousemove', this._mouseMove)
      node.addEventListener('mouseup', this._mouseUp)
    }

    this.updateContexts()
    if (this.canvasEl.current) {
      this.props.selectTool(
        new PaintBrush(
          this.canvasEl.current.getContext('2d'),
          this.element.current
        )
      )
    } else {
      throw new Error('No temp canvas rendered')
    }
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
    if (prevProps.masterTimestamp < this.props.masterTimestamp) {
      this.updateContexts(prevProps)
    }
  }

  updateContexts (prevProps) {
    this.props.layers.forEach(layer => {
      const ctx = contexts[layer.id]

      if (!prevProps) {
        ctx.drawImage(layer.canvas, 0, 0)
      } else {
        console.log(prevProps)
        const lastLayer = prevProps.layers.find(l => l.id === layer.id)

        if (!lastLayer || lastLayer.timestamp < layer.timestamp || true) {
          console.log('update')
          ctx.drawImage(layer.canvas, 0, 0)
        }
      }
    })
  }

  mouseDown (e) {
    const { tool } = this.props
    if (tool && typeof tool.mouseDown === 'function') {
      tool.mouseDown(e)
    }
  }

  mouseMove (e) {
    const { tool } = this.props
    if (tool && typeof tool.mouseMove === 'function') {
      tool.mouseMove(e)
    }
  }

  mouseUp (e) {
    const { tool } = this.props
    if (tool && typeof tool.mouseUp === 'function') {
      tool.mouseUp(e)
    }
  }

  render () {
    const {
      layers,
      width,
      height,
      currentLayer
    } = this.props

    return (
      <CanvasRenderer
        ref={this.element}
        layers={layers}
        currentLayer={currentLayer}
        tempCanvas={(
          <canvas
            width={width}
            height={height}
            key="tempcanvas"
            ref={this.canvasEl}
          />
        )}
      />
    )
  }
}

export default connect(
  state => ({
    layers: state.canvas.layers,
    width: state.canvas.width,
    height: state.canvas.height,
    masterTimestamp: state.canvas.masterTimestamp,
    currentLayer: state.canvas.currentLayer,
    tool: state.tool.current
  }),
  dispatch => ({
    selectTool: (toolInstance) => dispatch(selectTool(toolInstance))
  })
)(CanvasContainer)
