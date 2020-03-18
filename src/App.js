import React, { useState, useCallback } from 'react';
import {
  AppBar, Toolbar, IconButton, Typography
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import { makeStyles } from '@material-ui/styles'
import Canvas from 'Canvas';
import Menu from 'Menu';
import { useSelector } from 'react-redux';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    width: '100vw',
    backgroundColor: '#dfdfdd'
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}))

function App() {
  const classes = useStyles()
  const hasLayers = useSelector(state => state.canvas.layers.length > 0)

  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = useCallback(() => {
    setMenuOpen(false)
  }, [setMenuOpen])
  const openMenu = useCallback(() => {
    setMenuOpen(true)
  }, [setMenuOpen])

  return (
    <div className={classes.root}>
      <Menu open={menuOpen} onClose={closeMenu} />
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" className={classes.menuButton} onClick={openMenu}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Paint
          </Typography>
        </Toolbar>
      </AppBar>
      {hasLayers && (
        <Canvas />
      )}
    </div>
  );
}

export default App;
