import React from 'react';
import { connect } from 'react-redux';
import AppNavbar from '../NavBar';
import Dashboard from '../Dashboard';
import {
  BrowserRouter as Router,
  Switch
} from "react-router-dom";
import Spinner from '../Spinner';
import FileList from '../Files/FileList';
import GuardedRoute from '../../utils/GuardedRoute';
import Stats from '../Stats';
import Invoice from '../Invoices/Invoice';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { clearErrors } from '../../store/actions/errorActions';

const Home = ({isLoading, isAuthenticated, error}) => {

  const handleCloseError = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    clearErrors();
  }
  return (
    <>
      {!isLoading?
      <>
        <Router>
            <AppNavbar />
            <Switch>
              <GuardedRoute exact path = "/" auth={isAuthenticated} component={Dashboard} />
              <GuardedRoute exact path = "/files" auth={isAuthenticated} component={FileList} />
              <GuardedRoute exact path = "/stats" auth={isAuthenticated} component={Stats} />
              <GuardedRoute exact path = "/invoices" auth={isAuthenticated} component={Invoice} />
            </Switch>
        </Router> 
        </>
        :<Spinner />}
        {error.id!==null?
              <Snackbar 
                open={error.id!==null} 
                autoHideDuration={5000} 
                anchorOrigin={{ vertical: "top", horizontal: "right" }} 
                onClose={handleCloseError}
              >
                <Alert onClose={handleCloseError} severity="error" variant="filled">
                  {error.msg && error.msg.msg?error.msg.msg:null}
                </Alert>
              </Snackbar>
            :null
          }
    </>
  );
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.auth.isLoading,
        isAuthenticated: state.auth.isAuthenticated,
        error: state.error
    }
}

export default connect(mapStateToProps, null)(Home)
