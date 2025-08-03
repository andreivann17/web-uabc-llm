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
import logo from "./../../assets/img/logo.png";
import retina from "./../../assets/img/green_vessels_circular_bordered_with_dot.png";

const infoMessages = [
  "An early check-up can prevent the progression of many retinal diseases.",
  "According to the WHO, by 2050, 50% of the world population could suffer from myopia.",
  "Diabetic retinopathy is one of the leading causes of preventable blindness.",
  "Timely diagnosis of glaucoma can prevent irreversible damage.",
  "OCTs allow diseases to be detected before visible symptoms appear."
];

const { Meta } = Card;
function Home({}) {
    const canvasRef = useRef(null);
    const neurons = useRef([]);
    const [fadeClass, setFadeClass] = useState("fade-in");
  const [controlNeurons, setControlNeurons] = useState("block")
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
    const interval = setInterval(() => {
      setFadeClass("fade-out");
      setTimeout(() => {
        setShowInfoIndex((prev) => (prev + 1) % infoMessages.length);
        setFadeClass("fade-in");
      }, 600);
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const W = window.innerWidth;
    const H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    function randomNeuron() {
      const radius = 5 + Math.random() * 3;
      return {
        x: Math.random() * W,
        y: Math.random() * H,
        dx: (Math.random() - 0.5) * 5,
        dy: (Math.random() - 0.5) * 5,
        r: radius,
        id: Date.now() + Math.random(),
      };
    }

    for (let i = 0; i < 10; i++) neurons.current.push(randomNeuron());

    function animate() {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, W, H);

      for (let i = 0; i < neurons.current.length; i++) {
        for (let j = i + 1; j < neurons.current.length; j++) {
          const a = neurons.current[i];
          const b = neurons.current[j];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < 100) {
            ctx.beginPath();
            ctx.strokeStyle = "rgba(0,114,63," + (1 - dist / 100) + ")";
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      neurons.current.forEach(n => {
        ctx.beginPath();
        ctx.fillStyle = "#00723F";
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();

        n.x += n.dx;
        n.y += n.dy;

        if (n.x < -20 || n.x > W + 20 || n.y < -20 || n.y > H + 20) {
          Object.assign(n, randomNeuron());
          n.x = Math.random() < 0.5 ? -10 : W + 10;
          n.y = Math.random() * H;
        }
      });

      requestAnimationFrame(animate);
    }

    animate();
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);


  useEffect(() => {
    
    console.log(token)
    if (token == null) {
        //navegate("/login");
    }
  }, [token]);



const regresar = () =>{
  setLoading(false)
  setControlNeurons("block")
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
          z-index: 1;
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
                   <div style={{display:controlNeurons}}>
                     <canvas ref={canvasRef} className="neuron-canvas"></canvas>
                   </div>

      {token == null && (
        <>

        <Modal
  open={showExampleModal}
  footer={null}
  onCancel={() => setShowExampleModal(false)}
title="Select a sample image"
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
                dispatch(actionDiagnosis(file,callback,callbackError))
              });
          }}
        >
<Meta title={img.name} description="Click to select" />
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
  Automated Analysis Center
</h2>

<p style={{ fontSize: "17px", marginTop: "20px", background: "#fff", marginBottom: "60px", maxWidth: "500px", color: "#333" }}>
  Upload a fundus or OCT image to analyze your retina and detect possible diseases.
</p>
<Button className="custom-button" type="primary" onClick={() => fileInputRef.current.click()}>
  Upload image
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
    setControlNeurons("none")
    setLoading(true);
  setSelectedImageFile(file); // <-- guardar el File

    // Reiniciar historial
    
  dispatch(actionDiagnosis(file,callback,callbackError));

  }
}}


        />

       <p style={{ fontSize: "14px", marginTop: "20px", color: "#005f34" }}>
  Don't have an image?{" "}
  <a
    href="#"
    onClick={(e) => {
      e.preventDefault();
      setShowExampleModal(true);
    }}
    style={{ textDecoration: "underline" }}
  >
    View sample retina images
  </a>
</p>


      </div>

      {/* Términos */}
<div className="text-center w-100" style={{ bottom: 0, position: "absolute", borderTop: "1px solid #eee", zIndex:3,paddingTop: "10px" }}>

       <p style={{ fontSize: "12px", marginTop: "10px", color: "#666", maxWidth: "500px", margin: "auto" }}>
  By sending a message or image to UABC Retina, you agree to our <a style={{ color: "#666", textDecoration: "underline" }}>Terms</a> and acknowledge that you have read our <a style={{ color: "#666", textDecoration: "underline" }}>Privacy Policy</a>.
</p>

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
      zIndex: 4
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
Analyzing retina...
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
 <div style={{zIndex: 4}}>
    <Chat selectedImageFile={selectedImageFile} selectedImage={selectedImage} />

</div>
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
