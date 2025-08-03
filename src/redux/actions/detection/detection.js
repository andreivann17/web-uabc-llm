import axios from "axios"
import {
  FETCH_DETECTION_SUCCESS,
  FETCH_DETECTION_FAILURE,
  FETCH_DETECTION_DIAGNOSIS_FAILURE,
  FETCH_DETECTION_DIAGNOSIS_SUCCESS,
} from "./types";

const apiServiceGet = axios.create({
  baseURL: `http://${window.location.hostname}:8000/`,

  headers: {
    "Content-Type": "application/json",
    // Aquí puedes agregar otros headers globales si los necesitas
  },
});


export const actionDiagnosis = (file, callback) => {
  return async (dispatch) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const token = localStorage.getItem("tokends");

      const response = await apiServiceGet.post("http://191.101.14.88:8010/diagnostic/", formData, {
        headers: { 
          'Authorization': `Token ${token}`,
    'Content-Type': undefined  // ⚠️ Muy importante para que axios infiera el boundary
        },
      });

      if (response.status !== 200) {
        throw new Error(`Error: ${response.statusText}`);
      }

      console.log(response.data);

      dispatch(fetchDetectionDiagnosisSuccess(response.data));

      if (callback) callback(); // ✅ Ejecuta tu callback si lo diste

    } catch (error) {
      console.log("Error sending images:", error.message);
      dispatch(fetchDetectionDiagnosisFailure(error.message));
    }
  };
};

export const actionChatAskSync = (file,user_question, callback) => {
  return async (dispatch) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("user_question", user_question);

    try {
      const token = localStorage.getItem("tokends");

      const response = await apiServiceGet.post("http://191.101.14.88:8010/chat-sync/", formData, {
        headers: { 
          'Authorization': `Token ${token}`,
    'Content-Type': undefined  // ⚠️ Muy importante para que axios infiera el boundary
        },
      });

      if (response.status !== 200) {
        throw new Error(`Error: ${response.statusText}`);
      }

      console.log(response.data);

      dispatch(fetchDetectionDiagnosisSuccess(response.data));

      if (callback) callback(); // ✅ Ejecuta tu callback si lo diste

    } catch (error) {
      console.log("Error sending images:", error.message);
      dispatch(fetchDetectionDiagnosisFailure(error.message));
    }
  };
};

export const actionChatAsk = async (context_text, user_question, onToken, callbackError) => {
  const formData = new FormData();
  formData.append("context_text", context_text);
  formData.append("user_question", user_question);

  try {
    const response = await fetch("http://191.101.14.88:8010/chat/", {
      method: "POST",
      body: formData,
    });

    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      const chunk = decoder.decode(value, { stream: true });

      if (onToken) onToken(chunk);
    }
  } catch (err) {
    console.error("❌ Error en acción ChatAsk:", err);
    if (callbackError) callbackError(err);
  }
};

export const actionDetectionAdd = (imglist, callback) => {
  return async (dispatch) => {
      try {
          const token = localStorage.getItem("tokends");
          //const imglist = buildObject(images);
          const payload = {
              images: imglist,
              type:"web",
       
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

export const fetchDetectionDiagnosisSuccess = (data) => {
  return {
    type: FETCH_DETECTION_DIAGNOSIS_SUCCESS,
    payload: data,
  };
};

export const fetchDetectionDiagnosisFailure = (error) => {
  return {
    type: FETCH_DETECTION_DIAGNOSIS_FAILURE,
    payload: error,
  };
};

export const fetchDetectionSuccess = (data) => {
  return {
    type:  FETCH_DETECTION_SUCCESS,
    payload: data,
  };
};

export const fetchDetectionFailure = (error) => {
  return {
    type: FETCH_DETECTION_FAILURE,
    payload: error,
  };
};