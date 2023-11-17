// redux/reducers/index.js

import {FETCH_STATISTICS_FAILURE,FETCH_STATISTICS_SUCCESS} from '../actions/statistics/types';
const initialState = {
  data:{
    chartData:[],
    cardPositive:0,
    cardNegative:0,
    cardTotal:0,
  },

};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_STATISTICS_SUCCESS:
      return {
        ...state,
        data:action.payload,
      };
    case FETCH_STATISTICS_FAILURE:
      return {
        ...state,
        data: action.payload,
      };

    default:
      return state;
  }
};

export default rootReducer;
