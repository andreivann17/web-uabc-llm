import React, { useState } from "react";
import { Card, Drawer,Col, Row, Image, Dropdown, Menu, Button, Modal } from 'antd';
import Toast from "../../components/toasts/toast.jsx";
import HeaderNavbar from "../../components/navigation/header_navbar.jsx"
import "../../assets/css/pelotas_style.css"
//import {actionDivisas,actionEditar} from "../../redux/actions/divisas/divisas.js"
import { useEffect } from "react";
import { useDispatch, connect } from "react-redux";
import { useNavigate } from "react-router-dom";

import posgrado_img from "./../../assets/img/uabc/uabc-posgrado.jpg";
import logo from "./../../assets/img/uabc/logo.png";

const { Meta } = Card;
function Home({}) {
  const [msg, setMsg] = useState("");
  const [token,setToken]  = useState(localStorage.getItem("tokends"))
  const navegate = useNavigate();
  const [showtoast, setShowToast] = useState(false);
 

  
  useEffect(() => {
    
    console.log(token)
    if (token == null) {
        //navegate("/login");
    }
  }, [token]);
  return (
    <>
      {token == null && (
        <>
          <Toast msg={msg} setShow={setShowToast} show={showtoast} />
           <HeaderNavbar/>
          
          <div  className=" ">
       
          <div class="leaves-container">
            <div style={{zIndex:10,position:"absolute",left:"calc(50% - 160px)",top:"calc(50% - 100px)",width:"300px",height:"300px"}} >
          <div className="d-flex justify-content-center align-items-center">
          <div className=""  style={{ }}>
  <img  style={{ width: "120px" }} alt="" src={logo} />
  <h4 style={{ fontWeight: "650" }} className="text-center margint-1 text-success">
    UABC AI
  </h4>
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
          <div style={{width:"100wv",background:"#00723fde"}}>
          <div className="diagonal-container">
      <div className="text-section marginl-2 margint-2">
        <div className="marginb-2" style={{ borderBottom: "1px solid #fff" }}> 
        <h4 className="text-white" >
  Proyect UABC AI is:
</h4>
        </div>


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
            <div className="w-100 ">
<div  style={{marginTop:40,marginBottom:80}}>


<div className="d-flex justify-content-center ">
<h2 style={{marginBottom:30,fontWeight:600}}>
  Sections
  </h2>
  </div>
  <h6 style={{fontSize:18,paddingLeft:"40px"}}>
  The UABC AI Project offers a comprehensive suite of tools and detailed insights into diverse artificial intelligence models, facilitating advanced learning and application in the field.
  </h6>
  </div>

            <div className="d-flex justify-content-center" style={{ height: 400 }}>
      <div className="box p-4" style={{marginLeft:20,marginRight:20}}>
        <div >
          <div className="text-center">
            <i  className="fa-solid fa-flask-vial mb-2" style={{ fontSize: 42 }}></i>
            <h3 style={{ fontWeight: 600 ,color:"#00723fbb"}}>Research</h3>
          </div>
          <div className="p-2" style={{marginTop:20}}>
          <p style={{minHeight:"250px",textAlign:"justify"}}>
            The Research section serves as a scholarly resource that houses a wide range of articles and studies on artificial 
            intelligence. Here, academics and industry experts can access the latest research findings,
             review case studies, and explore theoretical approaches to AI. This section is designed to 
            support the scientific community by providing comprehensive insights that contribute to ongoing academic and technological advancements in the field
            </p>
           <div className="d-flex justify-content-end">
           <Button style={{minWidth:120}} onClick={() => true} className='custom-button' type="primary">Read More</Button>
           </div>
          </div>
        </div>
      </div>
      <div className="box p-4">
        <div >
          <div className="text-center">
            <i className="fa-solid fa-circle-nodes mb-2" style={{ fontSize: 42 }}></i>
            <h3 style={{ fontWeight: 600,color:"#00723fbb" }}>Models</h3>
          </div>
          <div className="p-2" style={{marginTop:20}}>
            <p style={{minHeight:"250px",textAlign:"justify"}}>
            The Models section of our website offers a hands-on experience with a variety of artificial intelligence models. 
            Users can interact with these models in real-time, testing and observing their functionalities live. 
            This section is intended for both educational purposes and practical applications, providing a unique opportunity to engage directly with AI technologies.
            </p>
            <div className="d-flex justify-content-end">
           <Button style={{minWidth:120}} onClick={() => true} className='custom-button' type="primary">Read More</Button>
           </div>
          </div>
        </div>
      </div>
      <div className="box p-4">
        <div >
          <div className="text-center">
            <i className="fa-solid fa-book mb-2" style={{ fontSize: 42 }}></i>
            <h3 style={{ fontWeight: 600 ,color:"#00723fbb"}}>Documentation</h3>
          </div>
          <div className="p-2 " style={{marginTop:20}}>
          <p style={{minHeight:"250px",textAlign:"justify"}}>
            The Docs section provides comprehensive documentation related to our 
            website and the artificial intelligence models featured. It includes detailed guides, FAQs, 
            and technical descriptions that help users understand and utilize the AI tools available on our platform effectively.
            </p>
            <div className="d-flex justify-content-end">
           <Button style={{minWidth:120}} onClick={() => true} className='custom-button' type="primary">Read More</Button>
           </div>
          </div>
        </div>
      </div>
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
