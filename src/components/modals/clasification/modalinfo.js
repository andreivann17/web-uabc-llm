import React, { useEffect, useState } from "react";
import { Modal, Button, Image, Card, Space, Carousel, Option } from "antd";
import { connect,useDispatch } from "react-redux";
import { Form } from "react-bootstrap";
import logo from "./../../../assets/img/logo.png";
import { imagesMPR } from "../../../containers/pages/utils/imagesMPR.js";
import {actionDiagnosisResultPost  } from "../../../redux/actions/diagnosisResult/diagnosisResult.js";
import Toast from "../../toasts/toast.jsx";

import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  MinusCircleOutlined,
  SyncOutlined,
  RadiusBottomrightOutlined,
} from "@ant-design/icons";
const socket = new WebSocket(
  "ws://" + window.location.hostname + ":8000" + "/ws/apps/users/"
);
socket.addEventListener("open", (event) => {
  console.log("Conexión WebSocket abierta");
});
socket.addEventListener("close", (event) => {
  console.log("Conexión WebSocket cerrada");
});

const customButtonStyle = {
  backgroundColor: "#00723f", // Color verde
  borderColor: "#00723f",
  color: "#fff",
};
;
const App = ({
  isModalOpen,
  setIsModalOpen,
  dataResult,
  NameCondition,
}) => {


  const handleCancel = () => {
    setIsModalOpen(false);
  };


  return (
    <>
   
   <Modal
      title="Detailed Information"
      visible={isModalOpen}
      onCancel={handleCancel}
      footer={null}
      width={"50vw"} // Reducido del 100vw para centrar y hacer el modal más compacto
      bodyStyle={{
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center", // Alinea todo al centro
      }}
    >
      {/* Tabla para los datos */}
      <table style={{ width: "100%", maxWidth: "600px",marginTop:30,fontSize:16 }}> {/* Limita el ancho máximo para centrar */}
        <tbody>
          {dataResult && (
            <>
              <tr>
                <td><strong>Image Name:</strong></td>
                <td>{dataResult.name}</td>
              </tr>
              <tr>
                <td><strong>Dataset Name:</strong></td>
                <td>{dataResult.dataset}</td>
              </tr>
              <tr>
                <td><strong>Condition:</strong></td>
                <td>{dataResult.condition}</td>
              </tr>
              <tr>
                <td><strong>Prediction:</strong></td>
                <td>{NameCondition}</td>
              </tr>
            </>
          )}
        </tbody>
      </table>
    </Modal>
      
    </>
  );
};

const mapStateToProps = (state) => ({
  data: state.records.data ?? [],
  NameCondition:state.diagnosisResult?.data[0]?.prediction[1],
});

export default connect(mapStateToProps)(App);
