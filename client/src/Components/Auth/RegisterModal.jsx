import React, { useState, useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import { register } from '../../store/actions/authActions';
import { clearErrors } from '../../store/actions/errorActions';
import {
  Button,
  TextField,
  Icon,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  InputAdornment,
  FormControl,
  InputLabel,
  Input
} from '@material-ui/core';
import {Alert} from '@material-ui/lab';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import axios from 'axios';

const useStyles = makeStyles((theme) => createStyles({
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
  },
  check: {
    cursor: 'pointer',
    color: 'red'
  }
}));

const RegisterModal = ({
  isAuthenticated,
  error,
  register,
  clearErrors
}) => {
  const classes = useStyles();
  const [modal, setModal] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState(null);
  const [username, setUsername] = useState('');
  const [usernameAvailability, setUsernameAvailability] = useState();
  const handleToggle = useCallback(() => {
    clearErrors();
    setModal(!modal);
  }, [clearErrors, modal]);

  const handleChangeName = (e) => setName(e.target.value);
  const handleChangeEmail = (e) => setEmail(e.target.value);
  const handleChangePassword = (e) => setPassword(e.target.value);
  const handleCheckUsername = () => {
    axios.get(`/api/v1/auth/username/available?username=${username}`)
    .then(res => setUsernameAvailability(res.data.msg))
  }
  const handleChangeUsername = (e) => setUsername(e.target.value);
  const handleOnSubmit = (e) => {
    e.preventDefault();
    const user = {
      name,
      username,
      email,
      password
    };
    register(user);
  };

  useEffect(() => {
    if (error.id === 'REGISTER_FAIL') {
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
    <>
      <Button className={classes.btnType2} color="inherit" onClick={handleToggle}>
        Register Now
      </Button>
      <Dialog open={modal} onClose={handleToggle} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Register</DialogTitle>
        <DialogContent dividers>
          <DialogContentText>
            Create your account to access uploading features.
          </DialogContentText>
          <div>
            {msg ? <Alert severity="error">{msg}</Alert> : null}
            <form className={classes.form} onSubmit={handleOnSubmit}>
                <TextField
                  label="Name"
                  type="text"
                  onChange={handleChangeName}
                  margin="dense"
                  fullWidth
                />
                <FormControl fullWidth>
                  <InputLabel htmlFor="standard-adornment-text">Username</InputLabel>
                  <Input
                    id="standard-adornment-text"
                    onChange={handleChangeUsername}
                    endAdornment={
                      <InputAdornment position="end">
                        <span
                          className={classes.check}
                          onClick={handleCheckUsername}
                        >
                          Check
                        </span>
                      </InputAdornment>
                    }
                  />
                  {usernameAvailability ? <Alert severity={usernameAvailability==='Not Available'?"error":"success"}>{usernameAvailability}</Alert> : null}
                </FormControl>
                <TextField
                  id="standard-email-input"
                  label="Email"
                  type="text"
                  onChange={handleChangeEmail}
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
                  endIcon={<Icon>add_circle</Icon>}
                  className={classes.btn}
                  >
                  Register
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
    </>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

export default connect(mapStateToProps, { register, clearErrors })(
  RegisterModal
);
