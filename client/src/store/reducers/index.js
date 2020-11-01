import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import fileReducer from './fileReducer';
import statsReducer from './statsReducer';
import invoiceReducer from './invoiceReducer';

export default combineReducers({
  error: errorReducer,
  auth: authReducer,
  files: fileReducer,
  stats: statsReducer,
  invoice: invoiceReducer
});
