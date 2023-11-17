// redux/reducers/index.js

import {FETCH_HISTORY_FAILURE,FETCH_HISTORY_SUCCESS} from '../actions/history/types';
const initialState = {
  data: [],

};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_HISTORY_SUCCESS:
      return {
        ...state,
        data:action.payload,
      };
    case FETCH_HISTORY_FAILURE:
      return {
        ...state,
        data: action.payload,
      };

    default:
      return state;
  }
};

export default rootReducer;
