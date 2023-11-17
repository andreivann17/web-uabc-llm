import axios from "axios"
import {FETCH_STATISTICS_FAILURE,FETCH_STATISTICS_SUCCESS} from "./types"
const apiServiceGet = axios.create({
  baseURL: `http://${window.location.hostname}:8000/`,

  headers: {
    "Content-Type": "application/json",
    // Aquí puedes agregar otros headers globales si los necesitas
  },
});

export const actionStatisticsGet = (startDate,endDate) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("tokends");
      const response = await apiServiceGet.get(  `analytics/${startDate}/${endDate}`, {
        headers: { Authorization: `Token ${token}` },
      });
      console.log(response.data);
      dispatch(fetchStatisticsSuccess(response.data));
    } catch (error) {
      dispatch(fetchStatisticsFailure(error.message));
    }
  };
};



export const fetchStatisticsSuccess = (value) => {
  return {
    type: FETCH_STATISTICS_SUCCESS,
    payload: value,
  };
};

export const fetchStatisticsFailure = (value) => {
  return {
    type: FETCH_STATISTICS_FAILURE,
    payload: value,
  };
};
