// redux/reducers/index.js

import {FETCH_DETECTION_DIAGNOSIS_FAILURE,FETCH_DETECTION_DIAGNOSIS_SUCCESS} from '../actions/detection/types';
const initialState = {
  data: [],

};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DETECTION_DIAGNOSIS_SUCCESS:
      return {
        ...state,
        data:action.payload,
      };
    case FETCH_DETECTION_DIAGNOSIS_FAILURE:
      return {
        ...state,
        data: action.payload,
      };

    default:
      return state;
  }
};

export default rootReducer;
