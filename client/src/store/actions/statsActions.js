import axios from 'axios';
import { returnErrors } from './errorActions';
import {
  FETCH_STATS_SUCCESS,
  FETCH_STATS_FAILED,
  FETCH_STATS_LOADING
} from '../types';

import {tokenConfig} from './authActions';

export const getStats = () => (dispatch, getState) => {
    dispatch({type: FETCH_STATS_LOADING})
    axios
      .get('/api/v1/invoice/stats', tokenConfig(getState))
      .then(res =>
          dispatch({
            type: FETCH_STATS_SUCCESS,
            payload: res.data
          })
      )
      .catch(err => {
        console.log("statsActions: Failed", err)
        dispatch(
          returnErrors(err.response.data, err.response.status, FETCH_STATS_FAILED)
        );
        dispatch({
          type: FETCH_STATS_FAILED
        });
      });
};
