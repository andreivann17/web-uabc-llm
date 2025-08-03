import React, { useRef, useState } from "react";
import { Card, Drawer,Col, Row, Image, Dropdown, Menu, Button, Modal } from 'antd';
import Toast from "../../components/toasts/toast.jsx";
import HeaderNavbar from "../../components/navigation/header_navbar.jsx"
import "../../assets/css/pelotas_style.css"
import {actionDiagnosis,actionChatAskSync} from "../../redux/actions/detection/detection.js"
import { useEffect } from "react";
import { useDispatch, connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LogoutOutlined } from '@ant-design/icons';
import Chat from "./chat/chat.jsx"
import posgrado_img from "./../../assets/img/uabc/uabc-posgrado.jpg";
import logo from "./../../assets/img/uabc/logo.png";
import retina from "./../../assets/img/green_vessels_circular_bordered_with_dot.png";

const infoMessages = [
  "Un chequeo temprano puede prevenir la progresión de muchas enfermedades de la retina.",
  "Según la OMS, para el 2050 el 50% de la población mundial podría padecer miopía.",
  "La retinopatía diabética es una de las principales causas de ceguera evitable.",
  "El diagnóstico oportuno del glaucoma puede evitar daños irreversibles.",
  "Los OCT permiten detectar enfermedades antes de que aparezcan síntomas visibles."
];

const { Meta } = Card;
function Home({}) {
  const [msg, setMsg] = useState("");
  const [token,setToken]  = useState(localStorage.getItem("tokends"))
  const [selectedImageFile, setSelectedImageFile] = useState(null);
const [fadeOutLoading, setFadeOutLoading] = useState(false);
const [showExampleModal, setShowExampleModal] = useState(false);
const exampleImages = [
  { id: 1, src: require("../../assets/img/209_right.jpg"), name: "Ejemplo 1" },
  { id: 2, src: require("../../assets/img/209_right.jpg"), name: "Ejemplo 2" },
  { id: 3, src: require("../../assets/img/209_right.jpg"), name: "Ejemplo 3" },
];
const dispatch = useDispatch();
  const [showtoast, setShowToast] = useState(false);
 const [selectedImage, setSelectedImage] = useState(null);
const [loading, setLoading] = useState(false);
const fileInputRef = React.useRef();
const [showInfoIndex, setShowInfoIndex] = useState(0);
const [transitionDone, setTransitionDone] = useState(false);


  // Cambio de mensaje informativo cada 7s
useEffect(() => {
  if (!loading || transitionDone) return;

  const interval = setInterval(() => {
    setShowInfoIndex(prev => (prev + 1) % infoMessages.length);
  }, 7000);

  return () => clearInterval(interval);
}, [loading, transitionDone]);




  useEffect(() => {
    
    console.log(token)
    if (token == null) {
        //navegate("/login");
    }
  }, [token]);



const regresar = () =>{
  setLoading(false)
  setFadeOutLoading(false);
  setTransitionDone(false)
}
const callback = () => {
  // Activar fade y luego transición
  setFadeOutLoading(true);
  setTimeout(() => {
    setTransitionDone(true);
  }, 1000);
};

const callbackError = () =>{
  regresar();
}
  return (
    <>
      <style>{`
        body, html {
          margin: 0;
          padding: 0;
          font-family: 'Segoe UI', sans-serif;
          background-color: white;
          overflow-x: hidden;
        }

        canvas.neuron-canvas {
          position: fixed;
          top: 0;
          left: 0;
          z-index: 0;
        }

        .hero-section {
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          z-index: 1;
        }

        .center-content {
          text-align: center;
          z-index: 10;
        }

        .center-content img {
          width: 120px;
          margin-bottom: 10px;
        }

        .title {
          font-size: 26px;
          font-weight: 650;
          color: #00723F;
          margin-bottom: 10px;
        }

        .promo-text {
          font-size: 18px;
          color: #444;
          transition: opacity 0.6s ease, transform 0.6s ease;
          margin-bottom: 20px;
        }

        .fade-in {
          opacity: 1;
          transform: translateY(0);
        }

        .fade-out {
          opacity: 0;
          transform: translateY(20px);
        }

        .start-button {
          background-color: #00723F;
          border: none;
          color: white;
          padding: 12px 28px;
          font-size: 16px;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 14px rgba(0,114,63,0.4);
        }

        .start-button:hover {
          background-color: #00994C;
          transform: scale(1.05);
        }

        .reach-section {
          background: #f0f0f0;
          padding: 50px 20px;
          z-index: 1;
        }
      `}</style>
      {token == null && (
        <>
        <Modal
  open={showExampleModal}
  footer={null}
  onCancel={() => setShowExampleModal(false)}
  title="Selecciona una imagen de ejemplo"
  centered
  width={720}
  bodyStyle={{ padding: 24 }}
>
  <Row gutter={[16, 16]}>
    {exampleImages.map((img) => (
      <Col xs={24} sm={12} md={8} key={img.id}>
        <Card
          hoverable
          cover={<img alt={img.name} src={img.src} style={{ height: 180, objectFit: "cover" }} />}
          onClick={() => {
            setShowExampleModal(false);
            setSelectedImage(img.src);
            setLoading(true);
          

            // Aquí se convierte a Blob para enviar como si fuera archivo
            fetch(img.src)
              .then(res => res.blob())
              .then(blob => {
                const file = new File([blob], `example_${img.id}.jpg`, { type: "image/jpeg" });
                setSelectedImageFile(file);
                dispatch(actionChatAskSync(file,"What is my diagnosis?",callback,callbackError))
              });
          }}
        >
          <Meta title={img.name} description="Haz clic para seleccionar" />
        </Card>
      </Col>
    ))}
  </Row>
</Modal>

          <Toast msg={msg} setShow={setShowToast} show={showtoast} />
           <HeaderNavbar/>



          <div  className=" " >
       
     <div className="leaves-container">

  {!loading && (
    <>
      {/* Logo + texto + botón */}
    <div
  className="diagnosis-card"
  style={{
    zIndex: 10,
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center",
    padding: "40px",
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)",
    maxWidth: "560px",
    width: "90%",
    transition: "all 0.4s ease-in-out",
  }}
>

       <div className="d-flex justify-content-center align-items-center">
         <img style={{ width: "120px",marginRight:"5px" }} alt="" src={logo} />
          <img style={{ width: "100px",height:"100px" }} alt="" src={retina} />
       </div>
    <h2 style={{ fontWeight: "650", fontSize: "24px" }} className="text-center margint-1 text-success">
  Centro de Análisis Automatizado
</h2>

        <p style={{ fontSize: "17px", marginTop: "20px", background: "#fff", marginBottom: "60px", maxWidth: "500px", color: "#333" }}>
          Sube una imagen de fondo de ojo u OCT para analizar tu retina y detectar posibles enfermedades.
        </p>
        <Button className="custom-button" type="primary" onClick={() => fileInputRef.current.click()}>
          Subir imagen
        </Button>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: "none" }}
         onChange={(e) => {
  const file = e.target.files[0];
  if (file) {
    const url = URL.createObjectURL(file);
    setSelectedImage(url);
    setLoading(true);
  setSelectedImageFile(file); // <-- guardar el File

    // Reiniciar historial
    
  dispatch(actionChatAskSync(file,"What is my diagnosis?",callback,callbackError));

  }
}}


        />

        <p style={{ fontSize: "14px", marginTop: "20px", color: "#005f34" }}>
  ¿No tienes una imagen?{" "}
  <a
    href="#"
    onClick={(e) => {
      e.preventDefault();
      setShowExampleModal(true);
    }}
    style={{ textDecoration: "underline" }}
  >
    Ver ejemplos de imágenes de retina
  </a>
</p>

      </div>

      {/* Términos */}
   <div className="text-center w-100" style={{ bottom: 0, position: "absolute", borderTop: "1px solid #eee", paddingTop: "10px" }}>

        <p style={{ fontSize: "12px", marginTop: "10px", color: "#666", maxWidth: "500px", margin: "auto" }}>
          Al enviar un mensaje o imagen a UABC Retina, aceptas nuestros <a href="/terminos" style={{ color: "#666", textDecoration: "underline" }}>Términos</a> y reconoces que leíste nuestra <a href="/privacidad" style={{ color: "#666", textDecoration: "underline" }}>Política de privacidad</a>.
        </p>
      </div>

      {/* Pelotas */}
   <div class="leaves-left">
  <div class="leaf green slow"></div>
  <div class="leaf gold medium"></div>
  <div class="leaf green fast"></div>
  <div class="leaf gold slow"></div>
  <div class="leaf green medium"></div>
  <div class="leaf gold fast"></div>
 
</div>

<div class="leaves-right">
  <div class="leaf green slow"></div>
  <div class="leaf gold medium"></div>
  <div class="leaf green fast"></div>
  <div class="leaf gold slow"></div>
  <div class="leaf green medium"></div>
  <div class="leaf gold fast"></div>
  <div class="leaf green slow"></div>

</div>
    </>
  )}

  {/* LOADING */}
{loading && !transitionDone && (
  <div
    className={fadeOutLoading ? "fade-loading-out" : ""}
    style={{
      position: "absolute",
      top: "50%",
      left: "68%",
      transform: "translate(-70%, -50%)",
      transition: "all 3s ease",
      textAlign: "center",
      width: "calc(100% - 80px)",
      display: "block",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 99
    }}
  >
    <img
      src={selectedImage}
      alt="seleccionada"
      style={{
        width: "160px",
        marginBottom: "30px",
        transition: "all 6s ease",
        alignSelf: "center"
      }}
    />

    <p
      style={{
        fontWeight: "600",
        fontSize: "18px",
        color: "#00723F",
        marginBottom: "30px"
      }}
    >
      Cargando...
    </p>

    <div className="spinner-container">
      <div className="spinner-dot green-dot"></div>
      <div className="spinner-dot gold-dot"></div>
      <div className="spinner-dot green-dot"></div>
      <div className="spinner-dot gold-dot"></div>
      <div className="spinner-dot green-dot"></div>
      <div className="spinner-dot gold-dot"></div>
      <div className="spinner-dot green-dot"></div>
      <div className="spinner-dot gold-dot"></div>
    </div>

    <div
      key={showInfoIndex}
      style={{
        marginTop: "40px",
        fontSize: "14px",
        color: "#333",
        maxWidth: "500px",
        marginLeft: "auto",
        marginRight: "auto",
        opacity: 0,
        animation: "fadeInOut 7s ease-in-out forwards"
      }}
    >
      {infoMessages[showInfoIndex]}
    </div>
  </div>
)}


{transitionDone && (
 <>
    <Chat selectedImageFile={selectedImageFile} selectedImage={selectedImage} />

</>
)}



</div>

         
      
       
          </div>
        </>
      )}
    </>
  );
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps)(Home);
