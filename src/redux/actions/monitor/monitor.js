import axios from "axios"
import {FETCH_MONITOR_FAILURE,FETCH_MONITOR_SUCCESS,FETCH_OBJECT_FAILURE,FETCH_OBJECT_SUCCESS} from "./types"
const apiServiceGet = axios.create({
  baseURL: `http://${window.location.hostname}:8000/`,

  headers: {
    "Content-Type": "application/json",
    // Aquí puedes agregar otros headers globales si los necesitas
  },
});

export const actionMonitorGet = (callback) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("tokends");
      const response = await apiServiceGet.get(  `detection/me/monitor/`, {
        headers: { Authorization: `Token ${token}` },
      });
      console.log(response.data);
      dispatch(fetchMonitorSuccess(response.data));
      callback()
    } catch (error) {
      dispatch(fetchMonitorFailure(error.message));
    }
  };
};
export const actionObjectGet = (callback) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("tokends");
      const response = await apiServiceGet.get(  `detection/me/mobile/`, {
        headers: { Authorization: `Token ${token}` },
      });
      console.log(response.data);
      dispatch(fetchObjectSuccess(response.data));
      callback()
    } catch (error) {
      dispatch(fetchObjectFailure(error.message));
    }
  };
};
export const actionMonitorPost = ( diagnosis,comments,diagnosis_id,clave, callback) => {
  return async (dispatch) => {
      try {
          const token = localStorage.getItem("tokends");
        
          const payload = {
              
              type:"web",
              diagnosis: diagnosis,
              diagnosis_id: diagnosis_id,
              comments: comments,
              clave:clave,
          };
          
          const response = await apiServiceGet.post("detection/me/monitor/", JSON.stringify(payload), {
              headers: { 
                  'Authorization': `Token ${token}`,
                  'Content-Type': 'application/json'
              },
          });
          
          if (response.status !== 200) {
              throw new Error(`Error: ${response.statusText}`);
          }
          console.log(response.data)

      
          callback(response.data);

      } catch (error) {
          console.log("Error sending images:", error.message);
      }
  };
};
export const fetchObjectSuccess = (value) => {
  return {
    type: FETCH_OBJECT_SUCCESS,
    payload: value,
  };
};

export const fetchObjectFailure = (value) => {
  return {
    type: FETCH_OBJECT_FAILURE,
    payload: value,
  };
};
export const fetchMonitorSuccess = (value) => {
  return {
    type: FETCH_MONITOR_SUCCESS,
    payload: value,
  };
};

export const fetchMonitorFailure = (value) => {
  return {
    type: FETCH_MONITOR_FAILURE,
    payload: value,
  };
};
