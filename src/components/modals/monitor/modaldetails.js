import React, { useEffect, useState } from "react";
import { Modal, Button, Image, Card, Space, Carousel, Option } from "antd";
import { connect,useDispatch } from "react-redux";
import { Form } from "react-bootstrap";
import logo from "./../../../assets/img/logo.png";
import { imagesMPR } from "../../../containers/pages/utils/imagesMPR.js";
import { imagesCataract } from "../../../containers/pages/utils/imagesCataract.js";
import { imagesMiopy } from "../../../containers/pages/utils/imagesMiopy.js";
import { imagesWet } from "../../../containers/pages/utils/imagesWet.js";
import { actionMonitorPost } from "../../../redux/actions/monitor/monitor";
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
  "branch retinal vein occlusion",
  "cataract",
  "central retinal vein occlusion",
  "chorioretinal atrophy",
  "diabetic retinopathy",
  "drusen",
  "dry age-related macular degeneration",
  "epiretinal membrane",
  "epiretinal membrane over the macula",
  "glaucoma",
  "hypertensive retinopathy",
  "laser spot",
  "lens dust",
  "macular epiretinal membrane",
  "maculopathy",
  "mild nonproliferative retinopathy",
  "moderate non proliferative retinopathy",
  "myelinated nerve fibers",
  "myopia retinopathy",
  "normal fundus",
  "optic disc edema",
  "pathological myopia",
  "peripapillary atrophy",
  "post laser photocoagulation",
  "post retinal laser surgery",
  "proliferative diabetic retinopathy",
  "refractive media opacity",
  "retinal pigmentation",
  "retinitis pigmentosa",
  "severe nonproliferative retinopathy",
  "severe proliferative diabetic retinopathy",
  "spotted membranous change",
  "suspected glaucoma",
  "tessellated fundus",
  "vitreous degeneration",
  "wet age-related macular degeneration",
  "white vessel",
];
const App = ({
  isModalOpen,
  setIsModalOpen,
  detailID,
  dataDisease,
  dataPatient,
  setDataDisease,
  setIsCardActive,
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
  const onChangeDiagnosis = (value) => {
    setDiagnosis(value);
    setDataDisease((prevData) => {
      const newData = [...prevData];
      newData[indexImageList] = {
        ...newData[indexImageList],
        diagnosis: value,
      };
      return newData;
    });
  };

  const onChangeTextArea = (value) => {
    setComments(value);
    setDataDisease((prevData) => {
      const newData = [...prevData];
      newData[indexImageList] = { ...newData[indexImageList], comments: value };
      return newData;
    });
  };

  const onChangeImage = (value) => {
    console.log(value);
    console.log(dataDisease[indexImageList]);
    console.log(dataDisease[indexImageList][value]);

    setSelectedImage(dataDisease[indexImageList][value]);
    setTypeImage(value);
  };
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
  const showModalInfo = (value) => {
    setDescriptionModalInfo(dataDisease[indexImageList].description);
    setReferenceModal(dataDisease[indexImageList].reference);

    setVisibleInfo(value);
  };
  const callback = (value) =>{
    setIsCardActive(true)
    setIsModalOpen(false)
    setMsg("Se ha enviado correctamente.")
    setShowToast(true)
    socket.send(JSON.stringify({
      'puerta': "DIAGNOSISRESULT"
  }));
  }
  const enviar_diagnostico = () =>{
    // Suponiendo que dataDisease es un arreglo de objetos
    const diagnosisColumn = dataDisease.map(item => item.diagnosis);
    const commentsColumn = dataDisease.map(item => item.comments);
    const detectionPredictionIdColumn = dataDisease.map(item => item.detection_prediction_id);

    // Ahora puedes llamar a dispatch con estos arreglos
    dispatch(actionMonitorPost(diagnosisColumn, commentsColumn, detectionPredictionIdColumn,detailID,callback));

  }
  
  useEffect(() => {
    if (disease === "normal fundus") {
      setResultColor("#00572b");
    } else {
      setResultColor("#DD971A");
    }
  }, [disease]);
  useEffect(() => {
    if(typeof dataDisease[0] != "undefined"){
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
        wrapClassName="dark-moda"
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
          <div>
            <Button
              className="custom-button-secondary marginr-1"
              type="secundary"
            >
              <i className="fas fa-close marginr-1"></i>Cerrar
            </Button>
            <Button onClick={() => enviar_diagnostico()} className="custom-button" type="primary">
              <i className="fas fa-share marginr-1"></i>Enviar Resultados
            </Button>
          </div>
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
            {dataDisease.map((disease, index) => (
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
                      <h6 className="marginr-1">Diagnosis:</h6>
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
                    <Form.Select
                      className="custom-select-dark"
                      aria-label="Default select example"
                      style={{
                        backgroundColor: "#333",
                        color: "white",
                        borderColor: "#444",
                      }}
                      onChange={(e) => onChangeDiagnosis(e.target.value)}
                      value={diagnosis} // Asegúrate de que el valor del select se establezca aquí
                    >
                      {biomarkers.map((biomarker) => (
                        <option value={biomarker} key={biomarker}>
                          {biomarker}
                        </option>
                      ))}
                    </Form.Select>
                  </div>
                  <div className="margin-1 w-100 margint-4">
                    <h6 className="marginb-1 text-white">Comments</h6>
                    <Form.Control
                      as="textarea"
                      className="custom-textarea-dark"
                      rows={3}
                      value={comments} // Asegúrate de que el valor del textarea esté vinculado al estado
                      onChange={(e) => onChangeTextArea(e.target.value)}
                    />
                  </div>
                </Card>
              </Space>

              <div className="d-flex  align-items-center ">
      
              </div>
              <Space direction="vertical" size={16}>
                <Card
                  title={
                    <div className="d-flex ">
                      <h6 className="marginr-1">AI Diagnosis:</h6>
                    </div>
                  }
                  headStyle={{ backgroundColor: "#00572b", color: "white" }} // Estilo personalizado para el encabezado
                  bodyStyle={{ backgroundColor: "#222", color: "black" }} // Estilo personalizado para el cuerpo
                  style={{
                    width: 300,
                    border: "#444 solid 0px",
                  }}
                >
                  <span
                    class="badge rounded-pill text-bg-light boton-estilo"
                    style={{ fontSize: 14 }}
                    onClick={() => showModalInfo(true)}
                  >
                    {disease}
                  </span>
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
