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

const Home = ({isLoading, isAuthenticated}) => {
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
            </Switch>
        </Router> 
        </>
        :<Spinner />}
    </>
  );
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.auth.isLoading,
        isAuthenticated: state.auth.isAuthenticated
    }
}

export default connect(mapStateToProps, null)(Home)
