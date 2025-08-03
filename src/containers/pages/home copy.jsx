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
import Chat from "../pages/chat/chat.jsx"
import posgrado_img from "./../../assets/img/uabc/uabc-posgrado.jpg";
import logo from "./../../assets/img/uabc/logo.png";
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
      {token == null && (
        <>
       

          <Toast msg={msg} setShow={setShowToast} show={showtoast} />
           <HeaderNavbar/>



          <div  className=" " >
       
     <div className="leaves-container">

  {!loading && (
    <>
      {/* Logo + texto + botón */}
      <div style={{ zIndex: 10, position: "absolute", left: "50%", top: "calc(50% - 280px)", transform: "translateX(-50%)", textAlign: "center" }}>
        <img style={{ width: "120px" }} alt="" src={logo} />
        <h2 style={{ fontWeight: "650" }} className="text-center margint-1 text-success">UABC Retina</h2>
        
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







</div>

         
      
       
          </div>
        </>
      )}
    </>
  );
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps)(Home);
