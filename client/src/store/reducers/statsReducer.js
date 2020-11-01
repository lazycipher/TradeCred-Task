import {
    FETCH_STATS_SUCCESS,
    FETCH_STATS_LOADING,
    FETCH_STATS_FAILED
  } from '../types';
  
  const initialState = {
    stats: {},
    isLoaded: null
  };
  
  export default function statsReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_STATS_SUCCESS:
            return {
                ...state,
                stats: action.payload,
                isLoaded: true
            };
        case FETCH_STATS_FAILED:
            return {
                ...state,
                isLoaded: false
            };
        case FETCH_STATS_LOADING:
            return {
                ...state,
                stats: {},
                isLoaded: false
            };
        default:
            return state;
        }
  }
  