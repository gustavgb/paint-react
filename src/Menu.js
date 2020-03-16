import React, { useCallback } from 'react'

import { makeStyles } from '@material-ui/styles'
import {
  Slide,
  Paper,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Backdrop
} from '@material-ui/core'
import NoteAddIcon from '@material-ui/icons/NoteAddOutlined'
import CrossIcon from '@material-ui/icons/Close'

const useStyles = makeStyles(theme => ({
  root: {
    width: '15rem',
    height: '100vh',
    position: 'absolute',
    left: 0,
    zIndex: theme.zIndex.drawer
  },
  buttonContainer: {
    [theme.breakpoints.up('md')]: {
      minHeight: '64px',
      paddingRight: '8px'
    },
    display: 'flex',
    flexDirection: 'row-reverse',
    alignItems: 'center'
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff'
  }
}))

const Menu = ({ open, onClose }) => {
  const classes = useStyles()
  const onClickPaper = useCallback((e) => {
    e.stopPropagation()
  }, [])

  return (
    <Backdrop className={classes.backdrop} open={open} onClick={onClose}>
      <Slide in={open} direction="right">
        <Paper className={classes.root} square onClick={onClickPaper}>
          <div className={classes.buttonContainer}>
            <IconButton onClick={onClose} className={classes.closeBtn}>
              <CrossIcon />
            </IconButton>
          </div>
          <List component="nav" aria-label="menu">
            <ListItem button>
              <ListItemIcon>
                <NoteAddIcon />
              </ListItemIcon>
              <ListItemText primary="New image" />
            </ListItem>
          </List>
        </Paper>
      </Slide>
    </Backdrop>
  )
}

export default Menu
