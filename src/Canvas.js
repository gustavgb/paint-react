import React, { Component } from 'react'
import { withStyles } from '@material-ui/styles'
import { connect } from 'react-redux'
import PaintBrush from 'tools/PaintBrush'
import { selectTool } from 'actions/tool'
import { updateTimestamp } from 'actions/canvas'
import { CanvasState } from 'models/CanvasState'
import enhance from 'utils/enhance'

const state = window.state = new CanvasState()

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1
  },
  canvasContainer: {
    boxShadow: '0 0 10px 0px #454543',
    position: 'relative',
    width: props => props.width,
    height: props => props.height,
    '& > *': {
      position: 'absolute',
      left: 0,
      top: 0,
      pointerEvents: 'none',
      '&:first-child': {
        position: 'static'
      }
    }
  }
}

function joinIds (array) {
  return array
    .map(obj => obj.id)
    .join('')
}

class Canvas extends Component {
  constructor (props) {
    super(props)

    this._mouseDown = this.mouseDown.bind(this)
    this._mouseMove = this.mouseMove.bind(this)
    this._mouseUp = this.mouseUp.bind(this)

    this.canvasCtx = null
    this.tempCtx = null
    this.sizeElement = null
    this.eventElement = React.createRef()

    this.rect = {x: 0, y: 0}

    this.actions = {
      commit: this.actionCommit.bind(this)
    }
  }

  componentDidMount () {
    const node = this.eventElement.current
    if (node) {
      node.addEventListener('mousedown', this._mouseDown)
      node.addEventListener('mousemove', this._mouseMove)
      node.addEventListener('mouseup', this._mouseUp)
    }

    const {
      width,
      height,
      currentLayer,
      layers
    } = this.props

    state.setCurrentLayer(currentLayer)
    state.setDimensions(width, height)
    state.declareLayers(layers)

    state.renderToCanvas(this.canvasCtx)
    this.props.selectTool(new PaintBrush())
  }

  componentWillUnmount () {
    const node = this.eventElement.current
    if (node) {
      node.removeEventListener('mousedown', this._mouseDown)
      node.removeEventListener('mousemove', this._mouseMove)
      node.removeEventListener('mouseup', this._mouseUp)
    }
  }

  componentDidUpdate (prevProps) {
    if (prevProps.masterTimestamp < this.props.masterTimestamp) {
      if (joinIds(prevProps.layers) !== joinIds(this.props.layers)) {
        state.declareLayers(this.props.layers)
      }
      if (prevProps.width !== this.props.width || prevProps.height !== this.props.height) {
        state.setDimensions(this.props.width, this.props.height)
      }
      if (prevProps.currentLayer !== this.props.currentLayer) {
        state.setCurrentLayer(this.props.currentLayer)
      }

      state.renderToCanvas(this.canvasCtx)
    }
  }

  mouseDown (e) {
    const { tool } = this.props
    if (tool && typeof tool.mouseDown === 'function') {
      this.rect = this.sizeElement.getBoundingClientRect()
      const x = e.clientX - this.rect.x
      const y = e.clientY - this.rect.y
      tool.mouseDown(x, y, this.tempCtx, this.actions)
    }
  }

  mouseMove (e) {
    const { tool } = this.props
    if (tool && typeof tool.mouseMove === 'function') {
      const x = e.clientX - this.rect.x
      const y = e.clientY - this.rect.y
      tool.mouseMove(x, y, this.tempCtx, this.actions)
    }
  }

  mouseUp (e) {
    const { tool } = this.props
    if (tool && typeof tool.mouseUp === 'function') {
      const x = e.clientX - this.rect.x
      const y = e.clientY - this.rect.y
      tool.mouseUp(x, y, this.tempCtx, this.actions)
    }
  }

  actionCommit () {
    state.commit(
      this.tempCtx.canvas,
      () => {
        this.tempCtx.clearRect(
          0, 0,
          this.tempCtx.canvas.width, this.tempCtx.canvas.height
        )
        this.props.updateTimestamp()
      }
    )
  }

  render () {
    const { classes, width, height } = this.props
    return (
      <div className={classes.root} ref={this.eventElement}>
        <div className={classes.canvasContainer}>
          <canvas
            width={width}
            height={height}
            ref={node => { if (node) this.canvasCtx = node.getContext('2d'); this.sizeElement = node }}
          />
          <canvas
            width={width}
            height={height}
            ref={node => { if (node) this.tempCtx = node.getContext('2d') }}
          />
        </div>
      </div>
    )
  }
}

export default enhance(
  withStyles(styles),
  connect(
    state => ({
      layers: state.canvas.layers,
      width: state.canvas.width,
      height: state.canvas.height,
      masterTimestamp: state.canvas.masterTimestamp,
      tool: state.tool.current,
      currentLayer: state.canvas.currentLayer
    }),
    dispatch => ({
      selectTool: (toolInstance) => dispatch(selectTool(toolInstance)),
      updateTimestamp: () => dispatch(updateTimestamp())
    })
  )
)(Canvas)
