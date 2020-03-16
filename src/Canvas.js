import React, { useRef } from 'react'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(theme => ({
  root: {

  },
  canvas: {

  }
}))

const Canvas = () => {
  const classes = useStyles()
  const canvasRef = useRef(null)

  console.log(canvasRef)

  return (
    <div className={classes.root}>
      <canvas className={classes.canvas} ref={canvasRef} />
    </div>
  )
}

export default Canvas
