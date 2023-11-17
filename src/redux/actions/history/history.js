import axios from "axios"
import {FETCH_HISTORY_FAILURE,FETCH_HISTORY_SUCCESS} from "./types"
const apiServiceGet = axios.create({
  baseURL: `http://${window.location.hostname}:8000/`,

  headers: {
    "Content-Type": "application/json",
    // Aquí puedes agregar otros headers globales si los necesitas
  },
});

export const actionHistoryGet = (startDate,endDate) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("tokends");
      const response = await apiServiceGet.get(  `history/me/${startDate}/${endDate}`, {
        headers: { Authorization: `Token ${token}` },
      });
      console.log(response.data);
      dispatch(fetchHistorySuccess(response.data));
    } catch (error) {
      dispatch(fetchHistoryFailure(error.message));
    }
  };
};



export const fetchHistorySuccess = (value) => {
  return {
    type: FETCH_HISTORY_SUCCESS,
    payload: value,
  };
};

export const fetchHistoryFailure = (value) => {
  return {
    type: FETCH_HISTORY_FAILURE,
    payload: value,
  };
};
