import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { logout } from '../../store/actions/authActions';
import { MenuItem } from '@material-ui/core';

export const Logout = ({ logout, handleToggle }) => {
  const handleClick = () => {
    handleToggle();
    logout();
  }
  return (
    <Fragment>
      <MenuItem onClick={handleClick}>Logout</MenuItem>
    </Fragment>
  );
};

export default connect(null, { logout })(Logout);
