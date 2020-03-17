import React, { useState, useCallback } from 'react';
import {
  AppBar, Toolbar, IconButton, Typography
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import { makeStyles } from '@material-ui/styles'
import Canvas from 'Canvas';
import Menu from 'Menu';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    width: '100vw'
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
      <Canvas />
    </div>
  );
}

export default App;
