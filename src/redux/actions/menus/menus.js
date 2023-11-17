import {apiService} from "../../../containers/pages/utils/apiService";
import { FETCH_PRIVILEGIOS_SUCCESS, FETCH_PRIVILEGIOS_FAILURE,FETCH_BOTONES_FAILURE,FETCH_BOTONES_SUCCESS,FETCH_INFOUSER_FAILURE,FETCH_INFOUSER_SUCCESS } from './types';
const token = localStorage.getItem("tokends");

export const actionPrivilegios = () => {
  return async (dispatch) => {
    try {
      const response = await apiService.fetchData(
        `http://localhost:8000/app/admin/ajustes/`,
        {token:token,opcion:"AUTH"}
      );
      dispatch(fetchPrivilegiosSuccess(response.data.data));
    } catch (error) {
      dispatch(fetchPrivilegiosFailure(error.message));
    }
  };
};
export const actionBotones = () => {
  return async (dispatch) => {
    try {
      const response = await apiService.fetchData(
        `http://localhost:8000/app/admin/ajustes/`,
        {token:token,opcion:"BOTONES"}
      );
      dispatch(fetchBotonesSuccess(response.data.data));
    } catch (error) {
      dispatch(fetchBotonesFailure(error.message));
    
    }
  };
};
export const actionInfoUser = () => {
  return async (dispatch) => {
    try {
      const response = await apiService.fetchData(
        `http://localhost:8000/app/admin/ajustes/`,
        {token:token,opcion:"USER"}
      );
      dispatch(fetchUserSuccess(response.data.data));
    } catch (error) {
      dispatch(fetchUserFailure(error.message));
    
    }
  };
};
export const fetchPrivilegiosSuccess = (data) => {
  return {
    type: FETCH_PRIVILEGIOS_SUCCESS,
    payload: data,
  };
};

export const fetchPrivilegiosFailure = (error) => {
  return {
    type: FETCH_PRIVILEGIOS_FAILURE,
    payload: error,
  };
};
export const fetchBotonesSuccess = (data) => {
  return {
    type: FETCH_BOTONES_SUCCESS,
    payload: data,
  };
};

export const fetchBotonesFailure = (error) => {
  return {
    type: FETCH_BOTONES_FAILURE,
    payload: error,
  };
};

export const fetchUserSuccess = (data) => {
  return {
    type: FETCH_INFOUSER_SUCCESS,
    payload: data,
  };
};

export const fetchUserFailure = (error) => {
  return {
    type: FETCH_INFOUSER_FAILURE,
    payload: error,
  };
};