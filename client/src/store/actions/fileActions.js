import axios from 'axios';
import { returnErrors } from './errorActions';
import {
  FETCH_USER_FILES_SUCCESS,
  FETCH_USER_FILES_FAILED,
  SET_UPLOAD_PROGRESS,
  CLEAR_FILES,
  UPLOAD_SUCCESS,
  FILE_UPLOAD_FAILED
} from '../types';

import {tokenConfig} from './authActions';

export const getFiles = () => (dispatch, getState) => {

  axios
    .get('/api/v1/files', tokenConfig(getState))
    .then(res =>
        dispatch({
          type: FETCH_USER_FILES_SUCCESS,
          payload: res.data
        })
    )
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, FETCH_USER_FILES_FAILED)
      );
      dispatch({
        type: FETCH_USER_FILES_FAILED
      });
    });
};

export const uploadFile = (file) => (dispatch, getState) => {
  const formData = new FormData();
  formData.append('file', file);
  const token = getState().auth.token;
  const config = {
    headers: {
      'Content-type': 'application/json'
    },
    onUploadProgress: (ProgressEvent) => {
        let progress = Math.round(ProgressEvent.loaded / ProgressEvent.total * 100);
        dispatch({
          type: SET_UPLOAD_PROGRESS,
          payload: progress
        })
    }
  };
  if (token) {
    config.headers['x-auth-token'] = token;
  }
  axios
    .post('/api/v1/invoice/upload', formData, config).then(res => {
      console.log(res.data);
      dispatch({
        type: UPLOAD_SUCCESS,
        payload: res.data
      })
  }).catch(err => {
    console.log(err)
    dispatch(returnErrors(err.response.data, err.response.status, FILE_UPLOAD_FAILED))
  })
}



export const clearFiles = () => {
  return {
    type: CLEAR_FILES
  }
}
