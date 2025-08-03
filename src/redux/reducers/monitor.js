// redux/reducers/index.js

import {FETCH_MONITOR_FAILURE,FETCH_MONITOR_SUCCESS,FETCH_OBJECT_FAILURE,FETCH_OBJECT_SUCCESS} from '../actions/monitor/types';
const initialState = {
  data: [],

};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MONITOR_SUCCESS:
      return {
        ...state,
        data:action.payload,
      };
    case FETCH_MONITOR_FAILURE:
      return {
        ...state,
        data: action.payload,
      };
      case FETCH_OBJECT_SUCCESS:
      return {
        ...state,
        data:action.payload,
      };
    case FETCH_OBJECT_FAILURE:
      return {
        ...state,
        data: action.payload,
      };

    default:
      return state;
  }
};

export default rootReducer;
