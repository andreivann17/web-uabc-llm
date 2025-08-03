import React, { useEffect, useState } from "react";
import { Modal, Button, Image, Card, Space, Carousel, Option } from "antd";
import { connect,useDispatch } from "react-redux";
import { Form } from "react-bootstrap";
import logo from "./../../../assets/img/logo.png";
import { imagesMPR } from "../../../containers/pages/utils/imagesMPR.js";
import { imagesCataract } from "../../../containers/pages/utils/imagesCataract.js";
import { imagesMiopy } from "../../../containers/pages/utils/imagesMiopy.js";
import { imagesWet } from "../../../containers/pages/utils/imagesWet.js";
import {actionDiagnosisResultPost  } from "../../../redux/actions/diagnosisResult/diagnosisResult.js";
import Toast from "../../../components/toasts/toast.jsx";

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
const biomarkers = [
  "Branch Retinal Vein Occlusion",
  "Cataract",
  "Central Retinal Vein Occlusion",
  "Chorioretinal Atrophy",
  "Diabetic Retinopathy",
  "Drusen",
  "Dry Age-Related Macular Degeneration",
  "Epiretinal Membrane",
  "Epiretinal Membrane Over The Macula",
  "Glaucoma",
  "Hypertensive Retinopathy",
  "Laser Spot",
  "Lens Dust",
  "Macular Epiretinal Membrane",
  "Maculopathy",
  "Mild Nonproliferative Retinopathy",
  "Moderate Non Proliferative Retinopathy",
  "Myelinated Nerve Fibers",
  "Myopia Retinopathy",
  "Normal Fundus",
  "Optic Disc Edema",
  "Pathological Myopia",
  "Peripapillary Atrophy",
  "Post Laser Photocoagulation",
  "Post Retinal Laser Surgery",
  "Proliferative Diabetic Retinopathy",
  "Refractive Media Opacity",
  "Retinal Pigmentation",
  "Retinitis Pigmentosa",
  "Severe Nonproliferative Retinopathy",
  "Severe Proliferative Diabetic Retinopathy",
  "Spotted Membranous Change",
  "Suspected Glaucoma",
  "Tessellated Fundus",
  "Vitreous Degeneration",
  "Wet Age-Related Macular Degeneration",
  "White Vessel"
];
const App = ({
  isModalOpen,
  setIsModalOpen,
  dataDisease,
  dataPatient,
  setIsCardActive,
  isConfirmedActive
}) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [resultColor, setResultColor] = useState("#00572b");
  const [disease, setDisease] = useState("");
  const [diagnosis, setDiagnosis] = useState("0");
  const [comments, setComments] = useState("");
  const [indexImageList, setIndexImageList] = useState(0);
  const [visibleInfo, setVisibleInfo] = useState(false);
  const [referenceModal, setReferenceModal] = useState("");
  const [descriptionModalInfo, setDescriptionModalInfo] = useState("");
  const [index, setIndex] = useState(0);
  const [typeImage, setTypeImage] = useState("original");
  const dispatch = useDispatch();
  const [msg,setMsg] = useState("")
  const [showtoast,setShowToast] = useState(false)
 

 
  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const selectImage = (index) => {
    setSelectedImage(
      `http://${window.location.hostname}:8000${dataDisease[index].detection_img}`
    );

    setIndexImageList(index);
    setDisease(dataDisease[index].disease_name);
    setDiagnosis(dataDisease[index].diagnosis);
    setComments(dataDisease[index].comments);
    setTypeImage("original");
  };
 
  const callback = (value) =>{
    setIsCardActive(true)
    setIsModalOpen(false)

  }
  const aceptar_diagnostico = () =>{
    dispatch(actionDiagnosisResultPost(dataPatient[2],callback));
  }
  
  useEffect(() => {
    if (disease === "normal fundus") {
      setResultColor("#00572b");
    } else {
      setResultColor("#DD971A");
    }
  }, [disease]);
  useEffect(() => {
    if(   (typeof  dataDisease !="undefined"  && dataDisease.length >0 ) ){
        selectImage(0);
    }
  }, [dataDisease]);
  return (
    <>
    <Toast msg={msg} setShow={setShowToast} show={showtoast} />
    <Modal
        title="Detailed Information"
        visible={isModalOpen}
        onCancel={handleCancel}
        className="dark-modal"
        footer={null}
        wrapClassName="dark-modal"
        width={"100vw"}
        bodyStyle={{
          overflowY: "auto",
          maxWidth: "100vw",
          minHeight: "calc(100vh - 120px)",
          borderTop: "#333 solid 1px",
          backgroundColor: "#000",
          color: "#fff",
        }}
        style={{
          height: "calc(100vh - 10px)",
          top: 10,
          position: "fixed",
          left: 0,
          right: 0,
          backgroundColor: "#000",
          overflowY:"auto"
        }}
        okButtonProps={{ style: customButtonStyle }}
      >
        {/* Estilos adicionales */}
        <style jsx>
          {`
            .dark-modal .ant-modal-content {
              background-color: #000;
              transition: all 0.3s; // Transición al mostrar el modal
            }
            .dark-modal .ant-modal-header {
              border-bottom: 1px solid #000;
              background-color: #000;
            }
            .dark-modal .ant-modal-title {
              color: #aaa;
            }
            .dark-modal .ant-modal-close-x {
              color: #aaa;
            }
            .dark-modal .ant-modal-body {
              background-color: #000;
            }
            .image-list-item {
              // Estilo para cada imagen de la lista
              border-bottom: 2px solid #00723f;
              transition: transform 0.1s;
            }
            .image-list-item:active {
              // Efecto al hacer clic en la imagen
              transform: scale(0.95);
            }
            .image-list-item img {
              // Estilo para la imagen dentro del item
              border-bottom: 2px solid #00723f;
            }
          `}
        </style>
        <div
          className="d-flex justify-content-between margint-2 "
          style={{ marginBottom: 20 }}
        >
          {
            typeof dataPatient != "undefined" &&
         
          <div>
            <div className="d-flex ">
              <h6 className="text-ligth">Name:</h6>
              <h6 className="text-white" style={{ marginLeft: "10px" }}>
                {dataPatient[0]}
              </h6>
            </div>
            <div className="d-flex">
              <h6 className="text-ligth">Date:</h6>
              <h6 className="text-white" style={{ marginLeft: "20px" }}>
                {dataPatient[1]}
              </h6>
            </div>
          </div>
           }
           {
            isConfirmedActive &&
          
          <div>
            <Button
              className="custom-button-secondary marginr-1"
              type="secundary"
            >
              <i className="fas fa-close marginr-1"></i>Cerrar
            </Button>
            <Button onClick={() => aceptar_diagnostico()} className="custom-button" type="primary">
              <i className="fas fa-check marginr-1"></i>Aceptar
            </Button>
          </div>
           }
        </div>
        <div
          style={{
            display: "flex",
            minHeight: "calc(100vh - 100px)",
            width: "100%",
          }}
        >
          {/* Lista de imágenes */}
          <div
            style={{
              flex: "10%",
              paddingRight: "20px",
              borderRight: "1px solid #333",
              borderLeft: "0px",
              height: "90vh",
              overflowY: "auto",
            }}
            className="p-2"
          >
            {
             (typeof  dataDisease !="undefined"  && dataDisease.length >0 ) && 
            dataDisease.map((disease, index) => (
              <div
                key={index}
                className="image-list-item"
                style={{
                  marginBottom: "10px",
                  borderRadius: "5px",
                  border: "solid #333 0.5px",
                  borderTop: "none",
                  borderLeft: "none",
                  paddingBottom: "20px",
                  borderRight: "none",
                  backgroundColor: "#000",
                }}
              >
                <p style={{ color: "#aaa", textAlign: "center" }}>
                  {disease.image_name}
                </p>
                <img
                  src={`http://${window.location.hostname}:8000${disease.detection_img}`}
                  alt="selected"
                  style={{ width: "100%", cursor: "pointer", opacity: "0.8" }}
                  onClick={() => selectImage(index)}
                />
              </div>
            ))}
          </div>

          {/* Contenedor para mostrar la imagen seleccionada en grande */}
          <div
            style={{ flex: "60%", textAlign: "center" }}
            className="p-2 d-flex  justify-content-center"
          >
            {selectedImage && (
              <Card
                hoverable
                style={{
                  background: "#000",
                  border: "none",
                  width: "100%",
                  padding: 10,
                  margin: 10,
                }}
                cover={
                  <Image
                    style={{
                      width: "512px",
                      height: "512px",
                    }}
                    src={selectedImage}
                  />
                }
              ></Card>
            )}
          </div>
          <div
            className="justify-content-end d-flex"
            style={{
              flex: "30%",
              /*border: "solid #00723F 1px",*/

              height: "160px",

              borderRadius: "10px",
              marginTop: "20px",
            }}
          >
            <div>
              <Space className="marginb-4" direction="vertical" size={16}>
                <Card
                  title={
                    <div className="d-flex ">
                      <h6 className="marginr-1">Diagnosis Result:</h6>
                    </div>
                  }
                  headStyle={{ backgroundColor: "#00572b", color: "white" }} // Estilo personalizado para el encabezado
                  bodyStyle={{ backgroundColor: "#222", color: "black" }} // Estilo personalizado para el cuerpo
                  style={{
                    width: 300,
                    border: "#444 solid 0px",
                  }}
                >
                  <div
                    style={{
                      /*border: "solid #00723F 1px",*/

                      borderRadius: "10px",

                      margin: 10,

                      width: "100%",
                    }}
                  >
                       <h6 className="marginb-1 text-white">Diagnosis</h6>
                     <p style={{fontSize:"24px",fontWeight:550}} className="text-white">
                      {diagnosis}
                    </p>
               
                  </div>
                  <div className="margin-1 w-100 margint-4">
                    <h6 className="marginb-1 text-white">Comments</h6>
                    <p className="text-white">
                      {comments}
                    </p>
                 
                  </div>
                </Card>
              </Space>

             
            </div>
          </div>
        </div>
      </Modal>
      <Modal
        width={"80vw"}
        bodyStyle={{
          overflowY: "auto",

          minHeight: "calc(100vh - 120px)",
          borderTop: "#333 solid 1px",
        }}
        onCancel={() => setVisibleInfo(false)}
        footer={null}
        style={{
          top: 10,
          position: "fixed",
          left: 0,
          right: 0,
          border: "#333 solid 1px",
        }}
        title={
          <div className="d-flex align-items-center">
            <img className="marginr-2 marginb-1" width={30} src={logo} alt="" />
            <h5>Info</h5>
          </div>
        }
        visible={visibleInfo}
        wrapClassName="dark-modal"
      >
        <>
          <div
            className="d-flex align-items-center"
            style={{ minHeight: "calc(100vh - 140px)" }}
          >
            <div className="carousel-container-with-text">
              <Carousel
                activeIndex={index}
                onSelect={handleSelect}
                interval={null}
                indicators={false}
              >
                {imagesMPR.map((imagePath, idx) => (
                  <Carousel.Item key={idx}>
                    <div className="d-flex justify-content-center align-items-center carousel-item-container">
                      <img
                        alt={`Slide ${idx}`}
                        width={400}
                        height={400}
                        src={imagePath}
                      />
                    </div>
                  </Carousel.Item>
                ))}
              </Carousel>
            </div>
            <div
              className="text-container w-100"
              style={{
                height: "300px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                <h3 className="text-white marginb-2" style={{ width: "500px" }}>
                  {disease}
                </h3>
                <h5 className="text-white marginb-2" style={{ width: "500px" }}>
                  {descriptionModalInfo}
                </h5>
              </div>
              <div>
                <h6 className="text-white marginb-1 margint-4">References:</h6>
                <a
                  className="text-white"
                  href={referenceModal}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {referenceModal}
                </a>
              </div>
            </div>
          </div>

          <style jsx>
            {`
              .carousel-container-with-text {
                width: 100%; /* Ajusta esto según tus necesidades */
                max-width: 500px; /* Ajusta esto según tus necesidades */
                position: relative; /* Necesario para el posicionamiento de las flechas */
              }

              .carousel-item-container {
                height: 500px; /* Asegúrate de que todas las diapositivas tengan la misma altura */
              }

              .text-container {
                padding-left: 20px; /* Ajusta el espaciado según tus necesidades */
                max-width: 300px; /* Ajusta esto según tus necesidades */
              }

              .carousel-container-with-text .carousel-control-prev,
              .carousel-container-with-text .carousel-control-next {
                visibility: hidden;
              }

              .carousel-container-with-text:hover .carousel-control-prev,
              .carousel-container-with-text:hover .carousel-control-next {
                visibility: visible;
              }
            `}
          </style>
        </>
      </Modal>
    </>
  );
};

const mapStateToProps = (state) => ({
  data: state.records.data ?? [],
  // Supongo que imagesData se pasa aquí
});

export default connect(mapStateToProps)(App);
