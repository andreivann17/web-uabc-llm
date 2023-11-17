// redux/reducers/index.js
import prueba from "./../../assets/img/andre.jpg";
import { FETCH_PRIVILEGIOS_SUCCESS, FETCH_PRIVILEGIOS_FAILURE,FETCH_BOTONES_FAILURE,FETCH_BOTONES_SUCCESS,FETCH_INFOUSER_FAILURE,FETCH_INFOUSER_SUCCESS } from '../actions/menus/types';
const initialState = {
  privilegios: [2,2,2,2,2,2],
  botones: [],
  infoUser:{id:"0",nombre:"Andre Herrera",img:prueba}
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRIVILEGIOS_SUCCESS:
      return {
        ...state,
        privilegios:action.payload,
      };
    case FETCH_PRIVILEGIOS_FAILURE:
      return {
        ...state,
        privilegios: action.payload,
      };
      case FETCH_BOTONES_SUCCESS:
        return {
          ...state,
          botones:action.payload,
        };
      case FETCH_BOTONES_FAILURE:
        return {
          ...state,
          botones: action.payload,
        };
        case FETCH_INFOUSER_SUCCESS:
        return {
          ...state,
          infoUser:action.payload,
        };
      case FETCH_INFOUSER_FAILURE:
        return {
          ...state,
          infoUser: action.payload,
        };
    default:
      return state;
  }
};

export default rootReducer;
