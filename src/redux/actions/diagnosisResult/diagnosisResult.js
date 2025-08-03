import axios from "axios"
import {FETCH_DIAGNOSISRESULT_FAILURE,FETCH_DIAGNOSISRESULT_SUCCESS} from "./types"
const apiServiceGet = axios.create({
  baseURL: `http://${window.location.hostname}:8000/`,
  headers: {
    "Content-Type": "application/json",
    // Aquí puedes agregar otros headers globales si los necesitas
  },
});

export const actionDiagnosisResultGet = (callback) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("tokends");
      const response = await apiServiceGet.get(  `detection/me/diagnosis/`, {
        headers: { Authorization: `Token ${token}` },
      });
      console.log(response.data);
      dispatch(fetchDiagnosisResultSuccess(response.data));
      callback()
    } catch (error) {
      dispatch(fetchDiagnosisResultFailure(error.message));
    }
  };
};

export const actionDiagnosisResultPost = (clave,callback) => {
  return async (dispatch) => {
      try {
          const token = localStorage.getItem("tokends");
        
          const payload = {
              
              type:"web",
              clave:clave
         
          };
          
          const response = await apiServiceGet.post("detection/me/diagnosis/", JSON.stringify(payload), {
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
export const fetchDiagnosisResultSuccess = (value) => {
  return {
    type: FETCH_DIAGNOSISRESULT_SUCCESS,
    payload: value,
  };
};

export const fetchDiagnosisResultFailure = (value) => {
  return {
    type: FETCH_DIAGNOSISRESULT_FAILURE,
    payload: value,
  };
};
