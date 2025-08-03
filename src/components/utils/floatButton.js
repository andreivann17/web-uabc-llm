import React, { useEffect, useState } from "react";
import { Button, Tooltip, Badge } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { actionDiagnosisResultGet } from "../../redux/actions/diagnosisResult/diagnosisResult";
import ModalDetailsPatient from "../../components/modals/monitor/modaldetailspatient.js";
function App() {
  const dataDiagnosis = useSelector((state) => state.diagnosisResult.data ?? []);
  console.log(dataDiagnosis)
  const [isTabActive, setIsTabActive] = useState(true);
  const [isCardActive, setIsCardActive] = useState(true);
  const [isModalOpen,setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  // Efecto para manejar eventos de visibilidad y WebSocket
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsTabActive(document.visibilityState === "visible");
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    const socket = new WebSocket(
      `ws://${window.location.hostname}:8000/ws/apps/users/`
    );
    socket.addEventListener("open", () =>
      console.log("Conexión WebSocket abierta")
    );
    socket.addEventListener("message", (e) => {
      const data = JSON.parse(e.data);
      if (data["puerta"] === "DIAGNOSISRESULT" && isTabActive) {
        setIsCardActive(true);
      }
    });
    socket.addEventListener("close", () =>
      console.log("Conexión WebSocket cerrada")
    );

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      socket.close();
    };
  }, [isTabActive]);
  useEffect(() => {
    if (isCardActive) {
      dispatch(actionDiagnosisResultGet(() => setIsCardActive(false)));
    }
  }, [isCardActive, dispatch]);
  return (
    <>
    {
      (typeof  dataDiagnosis !="undefined"  && dataDiagnosis.length >0 )&&
    
      <ModalDetailsPatient isConfirmedActive={true} setIsCardActive={setIsCardActive} dataDisease={dataDiagnosis[0].diseases} dataPatient={[dataDiagnosis[0].patient_name,dataDiagnosis[0].datetime,dataDiagnosis[0].id]} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>
    }
      {
        dataDiagnosis.length>0 &&
      <Tooltip title="Diagnosis Result">
        <Button
        onClick={() => setIsModalOpen(true)}
          type="primary"
          shape="circle"
          style={{
            zIndex:9999,
            background: "white",
            position: "fixed",
            bottom: "20px",
            right: "20px",
            width: "60px", // Aumentar el tamaño del botón
            height: "60px", // Aumentar el tamaño del botón
            fontSize: "24px", // Aumentar el tamaño del ícono
          }}
        >
          <i className="fa-solid fa-file-medical text-success"></i>
          <div
            style={{
              background: "red",
              width: 10,
              height: 10,
              position: "absolute",
              right: "-5px",
              top: "-5px",
              borderRadius: "5px",
            }}
          ></div>
        </Button>
      </Tooltip>
}
    </>
  );
}
export default App;
