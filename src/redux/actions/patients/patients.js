import axios from "axios";
import {
  FETCH_PATIENTS_MALIGNUS_SUCCESS,
  FETCH_PATIENTS_MALIGNUS_FAILURE,
  FETCH_PATIENTS_FAILURE,
  FETCH_PATIENTS_SUCCESS,
  FETCH_PATIENTS_DASHBOARD_FAILURE,
  FETCH_PATIENTS_DASHBOARD_SUCCESS,
} from "./types";

const apiServiceGet = axios.create({
  baseURL: `http://${window.location.hostname}:8000/`,

  headers: {
    "Content-Type": "application/json",
    // Aquí puedes agregar otros headers globales si los necesitas
  },
});

export const actionPatientGet = () => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("tokends");
      const response = await apiServiceGet.get("patients/me", {
        headers: { Authorization: `Token ${token}` },
      });
      console.log(response.data);
      dispatch(fetchPatientSuccess(response.data));
    } catch (error) {
      dispatch(fetchPatientFailure(error.message));
    }
  };
};
export const actionPatientPost = (data, img) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("tokends");
      const payload = {
        data: data, // Agrega la data en el payload
        img: img, // Agrega la imagen en el payload
      };

      const response = await apiServiceGet.post("patients/me/", payload, {
        headers: { Authorization: `Token ${token}` },
      });
      console.log(response.data);
      //dispatch(actionPatientGet())
    } catch (error) {
      console.log(error.message);
    }
  };
};
export const actionPatientPatch = (data, img, callback) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("tokends");
      const payload = {
        data: data, // Agrega la data en el payload
        img: img, // Agrega la imagen en el payload
      };

      const response = await apiServiceGet.patch("patients/me/", payload, {
        headers: { Authorization: `Token ${token}` },
      });
      console.log(response.data);
      dispatch(actionPatientGet());
      callback();
    } catch (error) {
      console.log(error.message);
    }
  };
};
export const actionPatientDashboardGet = (startDate, endDate) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("tokends");
      const response = await apiServiceGet.get(
        `patients/dashboard/me/${startDate}/${endDate}`,
        { headers: { Authorization: `Token ${token}` } }
      );
      console.log(response.data);
      dispatch(fetchPatientDashboardSuccess(response.data));
    } catch (error) {
      dispatch(fetchPatientDashboardFailure(error.message));
    }
  };
};
export const actionPatientMalignusGet = () => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("tokends");
      const response = await apiServiceGet.get("patients/malignus/me", {
        headers: { Authorization: `Token ${token}` },
      });
      console.log(response.data);
      dispatch(fetchPatientMalignusSuccess(response.data));
    } catch (error) {
      dispatch(fetchPatientMalignusFailure(error.message));
    }
  };
};

export const fetchPatientDashboardSuccess = (data) => {
  return {
    type: FETCH_PATIENTS_DASHBOARD_SUCCESS,
    payload: data,
  };
};

export const fetchPatientDashboardFailure = (error) => {
  return {
    type: FETCH_PATIENTS_DASHBOARD_FAILURE,
    payload: error,
  };
};
export const fetchPatientSuccess = (data) => {
  return {
    type: FETCH_PATIENTS_SUCCESS,
    payload: data,
  };
};

export const fetchPatientFailure = (error) => {
  return {
    type: FETCH_PATIENTS_FAILURE,
    payload: error,
  };
};
export const fetchPatientMalignusSuccess = (data) => {
  return {
    type: FETCH_PATIENTS_MALIGNUS_SUCCESS,
    payload: data,
  };
};

export const fetchPatientMalignusFailure = (error) => {
  return {
    type: FETCH_PATIENTS_MALIGNUS_FAILURE,
    payload: error,
  };
};