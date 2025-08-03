import React, { useState, useEffect } from "react";
import Header from "../../components/navigation/header.jsx";
import Contenido from "../../components/navigation/content.jsx";
import logo from "./../../assets/img/logo.png";
import  { NotificationPlacement } from 'antd/es/notification/interface';
import Toast from "../../components/toasts/toast.jsx";
import backgroundImage from "../../assets/img/backgroundPatients.jpg";
import { message, Upload, Button, Steps,notification,Spin } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useDispatch, connect } from "react-redux";
import { actionDetectionAdd } from "../../redux/actions/detection/detection.js";
import { useNavigate } from "react-router-dom";
const Context = React.createContext({ name: 'Default' });
const socket = new WebSocket(
  "ws://" + window.location.hostname + ":8000" + "/ws/apps/users/"
);
socket.addEventListener("open", (event) => {
  console.log("Conexión WebSocket abierta");
});
socket.addEventListener("close", (event) => {
  console.log("Conexión WebSocket cerrada");
});

function Home({}) {
  const [msg, setMsg] = useState("");
  const navegate = useNavigate();
  const [showtoast, setShowToast] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [imagesData, setImagesData] = useState([]);
  const dispatch = useDispatch();
  const [api, contextHolder] = notification.useNotification();
  const [loading, setLoading] = useState(false);
  const [token,setToken]  = useState(localStorage.getItem("tokends"))

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
 
  useEffect(() => {
    if (fileList.length > 0) {
      setCurrentStep(1);
    } else {
      setCurrentStep(0);
    }
  }, [fileList]);
  useEffect(() => {
    console.log(imagesData)
  }, [imagesData]);
  const handleChange = (info) => {
    let fileList = [...info.fileList];
  
    // Limitar la lista de archivos a los últimos 5
    fileList = fileList.slice(-5);
  
    setFileList(fileList);
  
    // Convertir la imagen a Base64 y almacenarla
    if (info.file.status === "done") {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newData = {
          id: info.file.uid, // Utiliza un identificador único del archivo
          base64: reader.result
        };
        setImagesData((prevData) => [...prevData, newData]);
      };
      reader.readAsDataURL(info.file.originFileObj);
    } else if (info.file.status === "removed") {
      // Eliminar la imagen correspondiente en imagesData
      setImagesData((prevData) =>
        prevData.filter((data) => data.id !== info.file.uid)
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

  const callbackDetection = (img) => {
    setLoading(false);
    socket.send(JSON.stringify({
      'puerta': "MONITOR"
  }));
  setFileList([])
  setImagesData([])
  setShowToast(true)
  setMsg("Se ha enviado correctamente!")

  };

  
  const btn_results = () => {
    setLoading(true);
    dispatch(actionDetectionAdd(imagesData, fileList, callbackDetection));
  };

  useEffect(() => {
    console.log(token)
    if (token == null) {
      navegate("/login");
    }
  }, [token]);

  return (
    <>
    {token != null && (
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
      onClick={btn_results}
      className="mb-2"
      style={{ width: "260px", height: 120 }}
      disabled={loading}
    >
      {loading ? <Spin /> : <i style={{ fontSize: 18 }} className="fas fa-eye"></i>}
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
    </>
     )}
     </>
  );
  
}

const mapStateToProps = (state) => ({});
export default connect(mapStateToProps)(Home);
