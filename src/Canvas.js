import React, { useMemo, useEffect } from 'react'
import { makeStyles } from '@material-ui/styles'
import { useSelector } from 'react-redux'

const sortByIndex = (a, b) => {
  if (a.index < b.index) {
    return -1
  } else if (a.index > b.index) {
    return 1
  }
  return 0
}

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

const Canvas = () => {
  const classes = useStyles()

  const {
    layers
  } = useSelector(state => state.canvas)

  const layersOrderIdentity = layers.map(layer => layer.id).join('')
  const layersTimeIdentity = layers.map(layer => layer.timestamp).join('')

  const layersSorted = useMemo(() =>
    [...layers].sort(sortByIndex),
    // eslint-disable-next-line
    [layersOrderIdentity]
  )

  useEffect(
    () => {
      layers.forEach(layer => {
        const ctx = contexts[layer.id]

        ctx.drawImage(layer.canvas, 0, 0)
      })
    },
    // eslint-disable-next-line
    [layersTimeIdentity]
  )

  return (
    <div className={classes.root}>
      {layersSorted.map(layer => (
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
}

export default Canvas
