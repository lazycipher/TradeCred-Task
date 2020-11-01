import React, { useState, useEffect, useCallback } from 'react';
import {
  Button,
  TextField,
  Icon,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@material-ui/core';
import {Alert} from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { login } from '../../store/actions/authActions';
import { clearErrors } from '../../store/actions/errorActions';

const useStyles = makeStyles(theme => ({
  paper: {
      padding: theme.spacing(2, 4, 3),
  },
  btn: {
    margin: '20px auto 20px auto !important'
  },
  btnType2: {
    margin: 'auto 10px auto 10px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
}));

const LoginModal = ({
  isAuthenticated,
  error,
  login,
  clearErrors
}) => {
  const classes = useStyles();

  const [modal, setModal] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState(null);

  const handleToggle = useCallback(() => {
    // Clear errors
    clearErrors();
    setModal(!modal);
  }, [clearErrors, modal]);

  const handleChangeUsername = (e) => setUsername(e.target.value);
  const handleChangePassword = (e) => setPassword(e.target.value);

  const handleOnSubmit = (e) => {
    e.preventDefault();

    const user = { username, password };
    login(user);
  };

  useEffect(() => {
    if (error.id === 'LOGIN_FAIL') {
      setMsg(error.msg.msg);
    } else {
      setMsg(null);
    }
    if (modal) {
      if (isAuthenticated) {
        handleToggle();
      }
    }
  }, [error, handleToggle, isAuthenticated, modal]);

  return (
    <div>
      <Button className={classes.btnType2} color="inherit" variant="outlined" onClick={handleToggle}>
        Login
      </Button>
      <Dialog open={modal} onClose={handleToggle} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Login</DialogTitle>
        <DialogContent dividers>
          <DialogContentText>
            Login Now!
          </DialogContentText>
          <div>
            {msg ? <Alert severity="error">{msg}</Alert> : null}
            <form className={classes.form} onSubmit={handleOnSubmit}>
                <TextField
                  id="standard-text-input"
                  label="Username"
                  type="text"
                  onChange={handleChangeUsername}
                  margin="dense"
                  fullWidth
                />
                <TextField
                  id="standard-password-input"
                  label="Password"
                  type="password"
                  autoComplete="current-password"
                  onChange={handleChangePassword}
                  margin="dense"
                  fullWidth
                />
                <Button 
                  type="submit"
                  variant="contained" 
                  size="medium" 
                  color="primary" 
                  endIcon={<Icon>security</Icon>}
                  className={classes.btn}
                  >
                  Login
            </Button>
            </form>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleToggle} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

export default connect(mapStateToProps, { login, clearErrors })(LoginModal);
