// redux/reducers/index.js
import prueba from "./../../assets/img/andre.jpg";
import { FETCH_FORM_SUCCESS, FETCH_FORM_FAILURE } from '../actions/form/types';
const initialState = {
  data: {},
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_FORM_SUCCESS:
      return {
        ...state,
        data:action.payload,
      };
    case FETCH_FORM_FAILURE:
      return {
        ...state,
        data: action.payload,
      };
   
    default:
      return state;
  }
};


export default rootReducer;