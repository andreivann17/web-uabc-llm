import React, { useState } from "react";
import { Tabs} from 'antd';
import Toast from "../../../components/toasts/toast.jsx";
import "../../../assets/css/pelotas_style.css"
//import {actionDivisas,actionEditar} from "../../redux/actions/divisas/divisas.js"
import { useEffect } from "react";
import { useDispatch, connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import logo from "./../../../assets/img/logo.png";
import ImagesUpluad from "../../../components/forms/patients/patientsImage.js"

function Home({}) {
  const [msg, setMsg] = useState("");
  const [token,setToken]  = useState(localStorage.getItem("tokends"))
  const navegate = useNavigate();
  const [showtoast, setShowToast] = useState(false);
  const [imageUrl,setImageUrl] = useState("")
const onChange_Tab = (key) => {
    console.log(key);
  };
 
  const items = [
    {
      key: '1',
      label: 'Manual',
      children: <>
       <ImagesUpluad id={-1} setImageUrl={setImageUrl}></ImagesUpluad>
      </>,
    },
    {
      key: '2',
      label: 'Imagenes de Cataract',
      children: 'Content of Tab Pane 2',
    },
    {
        key: '3',
        label: 'Imagenes de Sanas',
        children: 'Content of Tab Pane 3',
      },
  ];
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
          <div className="bg-white d-flex align-items-center" style={{height:"60px",width:"100wv"}}>
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
          
    <div className="d-flex justify-content-between " style={{marginLeft:"40px", marginRight:"40px"}}>
    <Tabs defaultActiveKey="1" items={items} onChange={onChange_Tab} />
    </div>
        </>
      )}
    </>
  );
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps)(Home);
