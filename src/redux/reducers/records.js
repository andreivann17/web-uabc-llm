// redux/reducers/index.js

import {FETCH_RECORDS_FAILURE,FETCH_RECORDS_SUCCESS} from '../actions/records/types';
const initialState = {
  data: [],

};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_RECORDS_SUCCESS:
      return {
        ...state,
        data:action.payload,
      };
    case FETCH_RECORDS_FAILURE:
      return {
        ...state,
        data: action.payload,
      };

    default:
      return state;
  }
};

export default rootReducer;
