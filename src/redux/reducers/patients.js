
import { FETCH_PATIENTS_SUCCESS, FETCH_PATIENTS_FAILURE,FETCH_PATIENTS_DASHBOARD_FAILURE,FETCH_PATIENTS_DASHBOARD_SUCCESS, FETCH_PATIENTS_MALIGNUS_FAILURE, FETCH_PATIENTS_MALIGNUS_SUCCESS } from '../actions/patients/types';
const initialState = {
  data: {},
  dashboard:{
    chartData:[],
    cardPositive:0,
    cardNegative:0,
    cardTotal:0,
  },
  dataMalignus: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PATIENTS_SUCCESS:
      return {
        ...state,
        data:action.payload,
      };
    case FETCH_PATIENTS_FAILURE:
      return {
        ...state,
        data: action.payload,
      };
      case FETCH_PATIENTS_DASHBOARD_SUCCESS:
        return {
          ...state,
          dashboard:action.payload,
        };
      case FETCH_PATIENTS_DASHBOARD_FAILURE:
        return {
          ...state,
          dashboard: action.payload,
        };
      case FETCH_PATIENTS_MALIGNUS_SUCCESS:
        return {
          ...state,
          dataMalignus:action.payload,
        };
      case FETCH_PATIENTS_MALIGNUS_FAILURE:
        return {
          ...state,
          dataMalignus: action.payload,
        };
    default:
      return state;
  }
};


export default rootReducer;