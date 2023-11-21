import React, { useState, useEffect,useMemo } from "react";
import Header from "../../components/navigation/header.jsx";
import Contenido from "../../components/navigation/content.jsx";
import logo from "./../../assets/img/logo.png";
import  { NotificationPlacement } from 'antd/es/notification/interface';
import Toast from "../../components/toasts/toast.jsx";
import backgroundImage from "../../assets/img/backgroundPatients.jpg";
import {imagesMPR} from "./utils/imagesMPR.js"
import {imagesCataract} from "./utils/imagesCataract.js"
import {imagesMiopy} from "./utils/imagesMiopy.js"
import {imagesWet} from "./utils/imagesWet.js"
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  MinusCircleOutlined,
  SyncOutlined,
  RadiusBottomrightOutlined,
} from "@ant-design/icons";
import { message, Upload, Button, Steps, Modal, Card, Space, notification,Image } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Form } from "react-bootstrap";
import { useDispatch, connect } from "react-redux";
import { actionDetectionAdd } from "../../redux/actions/detection/detection.js";
import Carousel from 'react-bootstrap/Carousel';
const Context = React.createContext({ name: 'Default' });



function ImageComponent({ imagePath }) {
  return <img src={imagePath} alt="Slide" style={{ width:400, height:400 }} />;
}
function Home({}) {
  const [msg, setMsg] = useState("");
  const [showtoast, setShowToast] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [imagesData, setImagesData] = useState([]);
  const [imagesList, setImageList] = useState([]);
  const [indexImageList, setIndexImageList] = useState(0);
  const dispatch = useDispatch();
  const [api, contextHolder] = notification.useNotification();
  const [disease,setDisease] = useState("")
  const [resultColor,setResultColor] = useState("#00572b")
  const [typeImage,setTypeImage] = useState("original")
  const [visible, setVisible] = useState(false);
  const [visibleInfo, setVisibleInfo] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [referenceModal,setReferenceModal] = useState("")
  const [descriptionModalInfo,setDescriptionModalInfo] = useState("")
  const [index, setIndex] = useState(0);


  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };
  const openNotification = (placement: NotificationPlacement) => {
    api.info({
      message: `Aviso!`,
      description: (
        <>
          <Context.Consumer>
            {({  }) => "Los datos se proporcionan únicamente con fines informativos. El diagnóstico debe ser realizado por un profesional debidamente autorizado."}
          </Context.Consumer>

        </>
      ),
      placement,
      icon: <img src={logo} style={{ width: 24 }} />, // Reemplaza con la ruta de tu imagen
      duration: 0, // La notificación permanecerá hasta que el usuario la cierre
    });
  };
 

  const contextValue = useMemo(() => ({  }), []);
 
  useEffect(() => {
    if (fileList.length > 0) {
      setCurrentStep(1);
    } else {
      setCurrentStep(0);
    }
  }, [fileList]);

  const handleChange = (info) => {
    let fileList = [...info.fileList];
    fileList = fileList.slice(-5);
    setFileList(fileList);

    // Convertir la imagen a Base64 y almacenarla
    if (info.file.status === "done") {
      const reader = new FileReader();
      reader.onloadend = function () {
        setImagesData((prevData) => [...prevData, reader.result]);
      };
      reader.readAsDataURL(info.file.originFileObj);
    } else if (info.file.status === "removed") {
      const removedImageUrl = URL.createObjectURL(info.file.originFileObj);
      setImagesData((prevData) =>
        prevData.filter((imgUrl) => imgUrl !== removedImageUrl)
      );
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const customRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };
  const showModalInfo = (value) =>{
    setDescriptionModalInfo(imagesList[indexImageList]["description"])
    setReferenceModal(imagesList[indexImageList]["reference"])

    setVisibleInfo(value)
  }

  const callbackDetection = (img) => {
    setImageList(img);
    setVisible(true);
    openNotification('bottomRight')
  };

  const btn_results = () => {
    // Aquí puedes enviar el arreglo de imágenes y nombres como parámetros a tu función de acción
    console.log(imagesData);
    dispatch(actionDetectionAdd(imagesData, fileList, callbackDetection));
  };


  // Función para mostrar el modal
  const showModal = () => {
    setVisible(true);
    setTimeout(() => {
      openNotification('bottomRight');
    }, 300); // Ajusta el tiempo de retraso según sea necesario
    
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setVisible(false);
  };

  // Función para seleccionar una imagen y mostrarla en grande
  const onChangeImage = (value) => {
    console.log(imagesList);
    console.log(indexImageList);
    console.log(value)
    console.log("---------------")
    setSelectedImage(imagesList[indexImageList][value]);
    setTypeImage(value)
  };
  const selectImage = (index) => {
    setSelectedImage(imagesList[index]["original"]);

    setIndexImageList(index);
    setDisease(imagesList[index]["prediction"])
    setTypeImage("original")
    
  };
  useEffect(() => {
    if(disease === "Normal Fundus"){
      setResultColor("#00572b")
    }else{
      setResultColor("#DD971A")
    }
  }, [disease]);

  return (
    <>
      <Toast msg={msg} setShow={setShowToast} show={showtoast} />
      <Header title={"Diagnosis AI"} icon={"fas fa-eye marginr-1 "} />
      <Contenido
        backgroundImage={backgroundImage}
        title={"Diagnosis AI"}
        icon={"fas fa-eye marginr-1 "}
      />
      <div className="margin-3" style={{ minHeight: 400 }}>
        <div className="marginb-2 ">
          <Steps size="small" current={currentStep}>
            <Steps.Step title="Paso 1" description="Escoger imágenes" />
            <Steps.Step title="Paso 2" description="Enviar imagen y esperar" />
          </Steps>
        </div>

        <div className="d-flex w-100 justify-content-start">
          <div className="w-50 bg-white p-3 m-2">
            <Upload
              className=""
              action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
              listType="picture"
              fileList={fileList}
              onChange={handleChange}
              customRequest={customRequest}
            >
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </div>
          <div
            className="d-flex flex-column justify-content-center align-items-center m-2"
            style={{ flex: 1, minHeight: "200px" }}
          >
            <Button
              onClick={() => btn_results()}
              className="mb-2"
              style={{ width: "260px", height: 120 }}
            >
              <i style={{ fontSize: 18 }} className="fas fa-eye"></i>
              <h4>Ver resultados</h4>
            </Button>
          </div>
        </div>
      </div>
      

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
      <Modal
      width={"80vw"}
      bodyStyle={{
        overflowY: "auto",
      
        minHeight: "calc(100vh - 120px)",
        borderTop: "#333 solid 1px",
      }}
      onCancel={() => setVisibleInfo(false)}
      footer={null}
      style={{  top: 10, position: "fixed", left: 0, right: 0,border:"#333 solid 1px" }}
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
  <div className="d-flex align-items-center" style={{ minHeight: "calc(100vh - 140px)" }}>
    <div className="carousel-container-with-text">
      <Carousel activeIndex={index} onSelect={handleSelect} interval={null} indicators={false}>
        {imagesMPR.map((imagePath, idx) => (
          <Carousel.Item key={idx}>
            <div className="d-flex justify-content-center align-items-center carousel-item-container">
              <img alt={`Slide ${idx}`} width={400} height={400} src={imagePath}/>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
    <div className="text-container w-100" style={{height: '300px',display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
<div>
<h3 className="text-white marginb-2"  style={{width:"500px"}}>{disease}</h3>
<h5 className="text-white marginb-2" style={{width:"500px"}}>{descriptionModalInfo}</h5>
  </div>
 <div>
  <h6 className="text-white marginb-1 margint-4">References:</h6>
 <a className="text-white" href={referenceModal} target="_blank" rel="noopener noreferrer">{referenceModal}</a>
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

      

      <Modal
  title={
    <div className="d-flex justify-content-between align-items-center" style={{height:"50px"}}>
      <div className="d-flex align-items-center">
        <img className="marginr-2 marginb-1" width={30} src={logo} alt="" />
        <h5>Resultados</h5>
      </div>
      
    </div>
  }
  
  closable={false}
  visible={visible}
  className="dark-modal dark-modal-result"
  wrapClassName="dark-modal dark-modal-result"
  width={"100vw"}
  bodyStyle={{
    overflowY: "auto",
    maxWidth: "100vw",
    minHeight: "calc(100vh - 120px)",
    borderTop: "#333 solid 1px",
  }}
  style={{ height: "calc(100vh - 10px)", top: 10, position: "fixed", left: 0, right: 0 }}
  footer={null}
>
        <div
          style={{
            display: "flex",
            minHeight:"calc(100vh - 120px)",
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
              overflowY: "auto",
            }}
            className="p-2"
          >
            {imagesData.map((imgUrl, index) => (
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
                  {fileList[index]?.name}
                </p>
                <img
                  src={imgUrl}
                  alt="selected"
                  style={{ width: "100%", cursor: "pointer", opacity: "0.8" }}
                  onClick={() => selectImage(index)}
                />
              </div>
            ))}
          </div>

          {/* Contenedor para mostrar la imagen seleccionada en grande */}
          <div style={{ flex: "60%", textAlign: "center" }} className="p-2 d-flex align-items-center justify-content-center">
            {selectedImage && (
              <Card
              hoverable

              style={{ background:"#000",border:"none",width: '100%', padding: 10, margin: 10 }}
              cover={
                <Image
                style={{
                  maxHeight: "calc(100vh - 80px)",
                  maxWidth: "95%",
                
                }}
                  src={selectedImage} 
                />
              }
            >
          
            </Card>
              
            )}
         
          </div>

          {/* Nuevo contenedor a la derecha de la imagen grande */}
          <div
            className="justify-content-end d-flex"
            style={{
              flex: "30%",
              /*border: "solid #00723F 1px",*/

              height: "160px",

              borderRadius: "10px",
              marginTop:"20px"
          
            }}
          >
            <div>
              <Space direction="vertical" size={16}>
                <Card
                  title="Diagnosis:"
                  headStyle={{ backgroundColor: resultColor, color: "white" }} // Estilo personalizado para el encabezado
                  bodyStyle={{ backgroundColor: "#222", color: "black" }} // Estilo personalizado para el cuerpo
                  style={{
                    width: 300,
                    border:"#444 solid 0px"
                  }}
                >
                  <span
                    class="badge rounded-pill text-bg-light boton-estilo"
                    style={{ fontSize: 14 }}
                    onClick={() =>showModalInfo(true)}
                  >
                    {disease}
                  </span>
                </Card>
              </Space>
              <div className="d-flex  align-items-center ">
             
              <div
                style={{
                  /*border: "solid #00723F 1px",*/

                  borderRadius: "10px",

                  marginTop: 10,
                  width: "100%",
                }}
              >
                <Form.Select
                  className="custom-select-dark"
                  aria-label="Default select example"
                  style={{ backgroundColor: "#333", color: "white", borderColor: "#444" }}
                  onChange={(e) => onChangeImage(e.target.value)}
                  value={typeImage}
                >
                  <option value="original">Original</option>
                  <option value="vessels">Vessels</option>
                  <option value="disc_optic">Disc Optic</option>
                  <option value="microaneurism">Microaneurism</option>
                </Form.Select>
              </div>
              <div className="marginl-1 margint-1">

              </div>
            </div>
            </div>
           
          </div>
        </div>
        <Context.Provider value={contextValue}>
      {contextHolder}
      </Context.Provider>
      </Modal>
    </>
  );
}

const mapStateToProps = (state) => ({});
export default connect(mapStateToProps)(Home);
