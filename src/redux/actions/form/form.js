import {apiService,apiServicePatch,apiServiceDelete,apiServiceGet} from "../../../containers/pages/utils/apiService";
import {FETCH_FORM_FAILURE,FETCH_FORM_SUCCESS} from "./types"
export const actionEditar = (parametros,callback,callbackError) => {
  return async (dispatch) => {
    try {
      const response = await apiServicePatch.fetchData(
        `http://${window.location.hostname}:8000${window.location.pathname}`,
        parametros
      );
      callback()
    } catch (error) {
      callbackError(error.message);
    }
  };
};
export const actionObtenerall = (callback,callbackError) => {
  return async (dispatch) => {
    try {
      const response = await apiServicePatch.fetchData(
        `http://${window.location.hostname}:8000${window.location.pathname}`
      );
      callback()
    } catch (error) {
      callbackError(error.message);
    }
  };
};
export const actionObtener = (fecha,callback) => {
  return async (dispatch) => {
    try {
      const response = await apiServiceGet.fetchData(
        `http://${window.location.hostname}:8000${window.location.pathname}/${fecha}`,
        
      );

      dispatch(fetchFormSuccess(response.data.data))
      callback()
    } catch (error) {
      dispatch(fetchFormFailure(error.message))
    }
  };
};
export const actionAgregar = (parametros,callback,callbackError) => {
    return async (dispatch) => {
      try {
        const response = await apiService.fetchData(
          `http://${window.location.hostname}:8000${window.location.pathname}/`,
          parametros
        );
        callback(response.data.msg)
      } catch (error) {
        callbackError(error.message);
      }
    };
};
export const actionEliminar = (callback,callbackError) => {
    return async (dispatch) => {
      try {
        const response = await apiServiceDelete.fetchData(
          `http://${window.location.hostname}:8000${window.location.pathname}`,
        );
        callback()
      } catch (error) {
        callbackError(error.message);
      }
    };
};
export const fetchFormSuccess = (data) => {
  return {
    type: FETCH_FORM_SUCCESS,
    payload: data,
  };
};

export const fetchFormFailure = (error) => {
  return {
    type: FETCH_FORM_FAILURE,
    payload: error,
  };
};