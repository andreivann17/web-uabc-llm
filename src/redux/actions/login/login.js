import {apiServiceNoToken} from "../../../containers/pages/utils/apiService";
export const actionLogin = (parametros,callback,callbackError) => {
  return async (dispatch) => {
    try {
      const response = await apiServiceNoToken.fetchData(
        `http://${window.location.hostname}:8000/login/`,
        parametros
      );
      
      callback(response.data.data)
    } catch (error) {
      callbackError(error.message);
    }
  };
};
export const actionCorreo = (parametros,callback,callbackError) => {
  return async (dispatch) => {
    try {
      const response = await apiServiceNoToken.fetchData(
        `http://${window.location.hostname}:8000/login/correo/`,
        parametros
      );
      callback(response.data.data)
    } catch (error) {
      callbackError(error.message);
    }
  };
};
export const actionCodigo = (parametros,callback,callbackError) => {
  return async (dispatch) => {
    try {
      const response = await apiServiceNoToken.fetchData(
        `http://${window.location.hostname}:8000/login/codigo/`,
        parametros,
    
      );
      callback(response.data.data)
    } catch (error) {
      callbackError(error.message);
    }
  };
};
export const actionNewPassword = (parametros,callback,callbackError) => {
  return async (dispatch) => {
    try {
      const response = await apiServiceNoToken.fetchData(
        `http://${window.location.hostname}:8000/login/new-password/`,
        parametros,
   
      );
      callback(response.data.data)
    } catch (error) {
      callbackError(error.message);
    }
  };
};