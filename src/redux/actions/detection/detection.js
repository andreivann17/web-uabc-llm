import axios from "axios"
import {
  FETCH_DETECTION_FAILURE,
  FETCH_DETECTION_SUCCESS,
} from "./types";

const apiServiceGet = axios.create({
  baseURL: `http://${window.location.hostname}:8000/`,

  headers: {
    "Content-Type": "application/json",
    // Aquí puedes agregar otros headers globales si los necesitas
  },
});
const buildObject = (images) => {
  let box = {};
  for (let c = 0; c < images.length; c++) {
    box[c] = images[c];
  }
  return box;
};

export const actionDetectionAdd = (images, datalist, callback) => {
  return async (dispatch) => {
      try {
          const token = localStorage.getItem("tokends");
          const imglist = buildObject(images);
          const payload = {
              images: imglist,
              type:"web",
              datalist: datalist
          };
          
          const response = await apiServiceGet.post("detection/me/", JSON.stringify(payload), {
              headers: { 
                  'Authorization': `Token ${token}`,
                  'Content-Type': 'application/json'
              },
          });
          
          if (response.status !== 200) {
              throw new Error(`Error: ${response.statusText}`);
          }
          console.log(response.data)

          dispatch(fetchDetectionSuccess(response.data));
          callback(response.data);

      } catch (error) {
          console.log("Error sending images:", error.message);
      }
  };
};



export const fetchDetectionSuccess = (data) => {
  return {
    type: FETCH_DETECTION_SUCCESS,
    payload: data,
  };
};

export const fetchDetectionFailure = (error) => {
  return {
    type: FETCH_DETECTION_FAILURE,
    payload: error,
  };
};