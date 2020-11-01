import {
  FETCH_USER_FILES_SUCCESS,
  FETCH_USER_FILES_FAILED,
  DELETE_FILE_FAILED,
  DELETE_FILE_SUCCESS,
  CLEAR_FILES,
  UPLOAD_SUCCESS,
  SET_UPLOAD_PROGRESS,
} from '../types';

const initialState = {
  files: [],
  uploadDetails: {},
  uploadProgress: null
};

export default function fileReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_USER_FILES_SUCCESS:
      return {
          ...state,
          files: action.payload,
          loading: false
      };
    case FETCH_USER_FILES_FAILED:
      return {
        ...state,
        loading: false
      };
    case CLEAR_FILES:
      return {
        ...state,
        files: null
      };
    case UPLOAD_SUCCESS:
      return {
        ...state,
        uploadDetails: action.payload
      };
    case SET_UPLOAD_PROGRESS:
      return {
        ...state,
        uploadProgress: action.payload
      };
    default:
      return state;
  }
}
