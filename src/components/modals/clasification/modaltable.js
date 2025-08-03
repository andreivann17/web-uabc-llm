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
const App = ({
  isModalOpen,
  setIsModalOpen,
  dataResult,
  NameCondition,
  allPointsConditions,
  allNamesConditions
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
          height:500,
          display: "flex",
          flexDirection: "column",
          alignItems: "center", // Alinea todo al centro
        }}
      >
      
        
        {/* Tabla para los nombres de condiciones y puntuaciones */}
        <table style={{ 
          width: "100%", maxWidth: "600px", marginTop: 20, fontSize: 16 }}>
          <thead>
            <tr>
              <th style={{ border: "1px solid #ccc", padding: "8px", background: "#f0f0f0" }}>Condition Name</th>
              <th style={{ border: "1px solid #ccc", padding: "8px", background: "#f0f0f0" }}>Score</th>
            </tr>
          </thead>
          <tbody>
            {allNamesConditions && allPointsConditions && allNamesConditions.map((name, index) => (
              <tr key={index}>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>{name}</td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>{allPointsConditions[index]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Modal>
    </>
  );
};

const mapStateToProps = (state) => ({

  allPointsConditions:state.diagnosisResult?.data[0]?.prediction[2] ,
  allNamesConditions:state.diagnosisResult?.data[0]?.prediction[3],
});

export default connect(mapStateToProps)(App);
