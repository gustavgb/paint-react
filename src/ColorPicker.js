import React, { useState } from 'react'
import {
  Tabs, Tab, Menu, Button
} from '@material-ui/core'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(theme => ({
  button: {
    color: theme.palette.primary.contrastText
  },
  colorPreview: {
    height: '1.5rem',
    width: '1.5rem',
    backgroundColor: 'black',
    marginLeft: '0.5rem',
    borderRadius: '3px',
    border: '2px solid black'
  }
}))

const ColorPicker = () => {
  const color = useSelector(state => state.canvas.color)
  const classes = useStyles()

  const [anchorEl, setAnchorEl] = useState(null)
  const [tab, setTab] = useState(0)
  console.log(tab)

  return (
    <>
      <Button
        aria-controls="color-menu"
        aria-haspopup="true"
        onClick={e => setAnchorEl(e.currentTarget)}
        className={classes.button}
      >
        Colors:
        <div className={classes.colorPreview}></div>
      </Button>
      <Menu
        id="color-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <Tabs value={tab} onChange={(e, val) => setTab(val)} aria-label="color tabs">
          <Tab label="Primary" />
          <Tab label="Secondary" />
        </Tabs>
        {/* <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">Age</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={age}
            onChange={handleChange}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl> */}
      </Menu>
    </>
  )
}

export default ColorPicker
