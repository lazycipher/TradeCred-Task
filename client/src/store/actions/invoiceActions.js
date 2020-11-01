import axios from 'axios';
import { returnErrors } from './errorActions';
import {
    FETCH_INVOICES_FAILED,
    FETCH_INVOICES_SUCCESS,
    FETCH_INVALID_INVOICES_FAILED,
    FETCH_INVALID_INVOICES_SUCCESS
} from '../types';

import {tokenConfig} from './authActions';

export const getInvoices = () => (dispatch, getState) => {
  
  axios
    .get(`/api/v1/invoice/list`, tokenConfig(getState))
    .then(res =>
        dispatch({
          type: FETCH_INVOICES_SUCCESS,
          payload: res.data
        })
    )
    .catch(err => {
      console.log('error', err)
      dispatch(
        returnErrors(err.response.data, err.response.status, FETCH_INVOICES_FAILED)
      );
      dispatch({
        type: FETCH_INVOICES_FAILED
      });
    });
};

export const getInvalidInvoices = () => (dispatch, getState) => {

    axios
      .get(`/api/v1/invoice/invalidlist`, tokenConfig(getState))
      .then(res =>
          dispatch({
            type: FETCH_INVALID_INVOICES_SUCCESS,
            payload: res.data
          })
      )
      .catch(err => {
        dispatch(
          returnErrors(err.response.data, err.response.status, FETCH_INVALID_INVOICES_FAILED)
        );
        dispatch({
          type: FETCH_INVALID_INVOICES_FAILED
        });
      });
  };
