import React, { useState } from "react";
import { Card } from 'antd';
import Toast from "../../components/toasts/toast.jsx";
import "../../assets/css/pelotas_style.css"
//import {actionDivisas,actionEditar} from "../../redux/actions/divisas/divisas.js"
import { useEffect } from "react";
import { useDispatch, connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import logo from "./../../assets/img/logo.png";
import cataract_image from "./../../assets/img/0_left.jpg"
import myopia_image from "./../../assets/img/293_right.jpg"
import diabetic_image from "./../../assets/img/209_right.jpg"
import glaucoma_image from "./../../assets/img/T0086.jpg"
const { Meta } = Card;
function Home({}) {
  const [msg, setMsg] = useState("");
  //const [token,setToken]  = useState(localStorage.getItem("tokends"))
  const [token,setToken]  = useState('tokends')
  const navegate = useNavigate();
  const [showtoast, setShowToast] = useState(false);
  const navegate_click = (path) =>{
    navegate(path);
  }

  useEffect(() => {
    // dispatch(actionDivisas())
  }, []);
  useEffect(() => {
    console.log(token)
    if (token == null) {
      //navegate("/login");
    }
  }, [token]);
  return (
    <>
      {token != null && (
        <>
          <Toast msg={msg} setShow={setShowToast} show={showtoast} />
          <div className="bg-white d-flex align-items-center" style={{height:"60px",width:"100wv", position:"fixed"}}>
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
          
    <div className="d-flex justify-content-between responsive-container" style={{marginLeft:"40px", marginRight:"40px"}}>
      <div className="margint-5">
        <h2 className="text-success" style={{fontWeight:650}}>Gans Models</h2>
      </div>

      <div className="d-flex p-2 card-container">
        <Card
          hoverable
          style={{ width: 240, margin: 20 }}
          onClick={() => navegate_click("/gans/cataract")}
          cover={<img alt="Cataract Gans Model" src={cataract_image} />}
        >
          <Meta title="Cataract Gans Model" />
        </Card>

        <Card
          hoverable
          style={{ width: 240, margin: 20 }}
          cover={<img alt="Pathological Myopia Gans Model" src={myopia_image} />}
        >
          <Meta title="Pathological Myopia Gans Model" />
        </Card>

        <Card
          hoverable
          style={{ width: 240, margin: 20 }}
          cover={<img alt="Diabetic Retinopathy Gans Model" src={diabetic_image} />}
        >
          <Meta title="Diabetic Retinopathy Gans Model" />
        </Card>

        <Card
          hoverable
          style={{ width: 240, margin: 20 }}
          cover={<img alt="Glaucoma Gans Model" src={glaucoma_image} />}
        >
          <Meta title="Glaucoma Gans Model" />
        </Card>
      </div>
    </div>
        </>
      )}
    </>
  );
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps)(Home);
