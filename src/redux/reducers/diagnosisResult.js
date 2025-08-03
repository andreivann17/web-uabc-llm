// redux/reducers/index.js

import {FETCH_DIAGNOSISRESULT_FAILURE,FETCH_DIAGNOSISRESULT_SUCCESS} from '../actions/diagnosisResult/types';
const initialState = {
  data: [],

};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DIAGNOSISRESULT_SUCCESS:
      return {
        ...state,
        data:action.payload,
      };
    case FETCH_DIAGNOSISRESULT_FAILURE:
      return {
        ...state,
        data: action.payload,
      };

    default:
      return state;
  }
};

export default rootReducer;
