import React, { useState } from "react";
import { Card, Col, Row, Image, Dropdown, Menu, Button, Modal } from 'antd';
import Toast from "../../components/toasts/toast.jsx";
import "../../assets/css/pelotas_style.css"
//import {actionDivisas,actionEditar} from "../../redux/actions/divisas/divisas.js"
import { useEffect } from "react";
import { useDispatch, connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import clasification_img from "./../../assets/img/cards_models/clasification_2.png";
import detection_img from "./../../assets/img/cards_models/detection_2.jpg";
import gans_img from "./../../assets/img/cards_models/gans_2.jpg";
import style_transfer_img from "./../../assets/img/cards_models/style_transfer_2.jpg";
import segmentation_img from "./../../assets/img/cards_models/segmentation.webp";
import posgrado_img from "./../../assets/img/uabc/uabc-posgrado.jpg";
import logo from "./../../assets/img/logo.png";

const { Meta } = Card;
function Home({}) {
  const [msg, setMsg] = useState("");
  const [token,setToken]  = useState(localStorage.getItem("tokends"))
  const navegate = useNavigate();
  const [showtoast, setShowToast] = useState(false);
  const projects = [
    {   path: "/clasification",imageUrl: clasification_img, title: "Classification", description: "Descripción de Clasificación" },
    {path: "/object-detection", imageUrl: detection_img, title: "Object Detection", description: "Descripción de Detección de Objetos" },
    {  path: "/gans", imageUrl: gans_img, title: "GANs", description: "Descripción de GANs" },
    {path: "/neural-style-transfer", imageUrl: style_transfer_img, title: "Style Transfer", description: "Descripción de Neural Style Transfer" },
    { path: "/segmentation",imageUrl: segmentation_img, title: "Segmentation", description: "Descripción de Segmentación" }
  ];
 
  const handleCardClick = (path) => {
  
    navegate(path);
  };
  useEffect(() => {
    // dispatch(actionDivisas())
  }, []);
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
           <div className="bg-white d-flex align-items-center" style={{height:"60px",width:"100%",position:"sticky",top:0,zIndex:"10000000"}}>
          <div style={{marginLeft:"40px",marginRight:"40px"}} className="d-flex justify-content-between w-100 border-bottom">
          <div className="d-flex align-items-center" style={{marginBottom:"5px"}}>
          <img  style={{height:"50px"}} alt="" src={logo} />
          <h6 style={{fontWeight:"650"}}  className="marginl-1 mt-2 text-success">AI</h6>
          </div>
          <div className="d-flex  align-items-center" style={{marginBottom:"5px"}}>
      <a href="/home" className="styled-link">HOME</a>
      <a href="/docs" className="styled-link">DOCS</a>
      <a href="/models" className="styled-link">MODELS</a>
      <a href="/github" className="styled-link">GITHUB</a>
    </div>
          </div>
          </div>
          
          <div  className=" ">
       
          <div class="leaves-container">
            <div style={{zIndex:10,background:"#fff",position:"absolute",left:"calc(50% - 200px)",top:"calc(50% - 100px)",width:"300px",height:"300px"}} >
          <div className="d-flex justify-content-center align-items-center">
          <div >
          <img style={{"width":"120px"} }  alt="" src={logo} />
          <h4 style={{fontWeight:"650"}} className="text-center margint-1 text-success">UABC AI</h4>
          </div>
          </div>
            </div>
 <div class="leaves-left">
    <div class="leaf slow green"></div>
    <div class="leaf medium gold"></div>
    <div class="leaf slow green"></div>
    <div class="leaf medium gold"></div>
    <div class="leaf medium green"></div>
    <div class="leaf fast gold"></div>
 </div>
 <div class="leaves-right">
    <div class="leaf fast green"></div>
    <div class="leaf slow gold"></div>
    <div class="leaf medium green"></div>
    <div class="leaf fast gold"></div>
    <div class="leaf fast green"></div>
    <div class="leaf slow gold"></div>
    <div class="leaf medium green"></div>
    <div class="leaf fast gold"></div>
    
 </div>
          </div>
          <div style={{width:"100wv",background:"#00723fbb"}}>
          <div className="diagonal-container">
      <div className="text-section marginl-2 margint-2">
        <h4 className="text-white">Proyect UABC AI is:</h4>
        <p className="text-white">
          A collaborative initiative of professors and researchers from the 
          Universidad Autonoma de Baja California (UABC), designed to promote the 
          development and application of artificial intelligence within the scientific 
          community and future generations of researchers. Our goal is to create a learning and 
          collaboration ecosystem that promotes innovation and effective implementation of 
          AI models in various areas of research and development.
        </p>
      </div>
      <div className="image-section">
        {/* Aquí puedes insertar tu imagen */}
        <img src={posgrado_img} alt="Descriptive Alt Text" />
      </div>
    </div>
    </div>
            <div className="w-100 margint-5 marginr-2">
      <div className="p-4" style={{ width: '100%' }}>
    
 
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        {
            Array.isArray(projects) && projects.map((project, index) => (
            
              <Col xs={24} sm={12} md={8} lg={6}>
              
                <Card
                  hoverable
                  style={{ width: '100%', padding: 10, margin: 10 }}
                  cover={
                    <Image
                      height={200}
                      width={"100%"}
                      alt="example"
                      src={project.imageUrl} 
                    />
                  }
                >
                  <Meta title={project.title}  />
                  
                  <div className='margint-2 d-flex justify-content-end'>
               
                    <Button onClick={() => handleCardClick(project.path)} className='custom-button' type="primary"><i className='fas fa-file marginr-1'></i>Go</Button>
                  </div>
                </Card>
              </Col>
            ))
          }
        </Row>



      </div>
    </div>
      
       
          </div>
        </>
      )}
    </>
  );
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps)(Home);
