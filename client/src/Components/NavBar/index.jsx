import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import {
  AppBar,
  Typography,
  Toolbar,
  Container,
  Avatar,
  Popper,
  Paper,
  ClickAwayListener,
  Grow,
  MenuList,
  MenuItem,
  ButtonBase
} from '@material-ui/core';
import { 
  createStyles, 
  makeStyles, 
  Theme 
} from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import RegisterModal from '../Auth/RegisterModal';
import LoginModal from '../Auth/LoginModal';
import Logout from '../Auth/Logout';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      marginBottom: '1em'
    },
    AppBar: {
      backgroundColor: '#263238'
    }, 
    title: {
      flexGrow: 1,
    },
    logo: {
      maxWidth: '20%'
    },
    // avatar: {
    //   background: 'white'
    // },
    logo: {
      color: 'white',
      textDecoration: 'none'
    },
    blackLink: {
      color: 'black',
      textDecoration: 'none'
    }
  }),
);

const AppNavbar = ({ auth }) => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const anchorRef = React.useRef(null);
  const handleToggle = () => setOpen(!open);
  const handlePopperClose = (event) => {
      if (anchorRef.current && anchorRef.current.contains(event.target)) {
        return;
      }
      setOpen(false);
    }
  const authLinks = (
    <Fragment>
      <span className="navbar-text mr-3">
        <strong>
          {auth && auth.user ? <Avatar className={classes.avatar} component={ButtonBase} ref={anchorRef} onClick={handleToggle}></Avatar> : ''}
        </strong>
      </span>
      <Popper anchorEl={anchorRef.current} open={open} role={undefined} transition>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handlePopperClose}>
                  <MenuList autoFocusItem={open} id="menu-list-grow">
                    <Logout handleToggle={handleToggle} />
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
        <RegisterModal />
        <LoginModal />
    </Fragment>
  );

  return (
    <div className={classes.root}>
      <AppBar className={classes.AppBar} position="static">
        <Container maxWidth="md">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              <Link className={classes.logo} to="/">Invoice Manager</Link>
            </Typography>
            {auth && auth.isAuthenticated ? authLinks : guestLinks}
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, null)(AppNavbar);
