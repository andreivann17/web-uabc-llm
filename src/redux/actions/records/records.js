import axios from "axios"
import {FETCH_RECORDS_FAILURE,FETCH_RECORDS_SUCCESS} from "./types"
const apiServiceGet = axios.create({
  baseURL: `http://${window.location.hostname}:8000/`,

  headers: {
    "Content-Type": "application/json",
    // Aquí puedes agregar otros headers globales si los necesitas
  },
});

export const actionRecordsGet = (startDate,endDate) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("tokends");
      const response = await apiServiceGet.get(  `detection/me/${startDate}/${endDate}`, {
        headers: { Authorization: `Token ${token}` },
      });
      console.log(response.data);
      dispatch(fetchRecordsSuccess(response.data));
    } catch (error) {
      dispatch(fetchRecordsFailure(error.message));
    }
  };
};



export const fetchRecordsSuccess = (value) => {
  return {
    type: FETCH_RECORDS_SUCCESS,
    payload: value,
  };
};

export const fetchRecordsFailure = (value) => {
  return {
    type: FETCH_RECORDS_FAILURE,
    payload: value,
  };
};
