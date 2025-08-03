import React, { useState } from "react";
import { Tabs,Drawer,Upload} from 'antd';
import Toast from "../../components/toasts/toast.jsx";
import "../../assets/css/pelotas_style.css"
//import {actionDivisas,actionEditar} from "../../redux/actions/divisas/divisas.js"
import { useEffect } from "react";
import { useDispatch, connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import logo from "./../../assets/img/logo.png";
import FundusDiseases from "../../components/datasets/fundusDiseases.js"
import CardModelResults from "../../components/cards/statistics/CardResuls37Conditions.js";
import CardModelYOLOResults from "../../components/cards/statistics/CardResulsYOLOConditions.js";
import CardYoloStatistics from "../../components/cards/statistics/CardYoloStatistics.js";
import CardResultsSam from "../../components/cards/statistics/sam/CardResults.js";
import { actionDetectionAdd,actionDetectionComprobarRetina } from "../../redux/actions/detection/detection.js";
import mosaico from  "./../../assets/img/uabc/mosaico.png"
function Home({samExudados,samHemorragias,samMicro,samSoftExudados,samHemoKey,samMicroKey,samSoftExudadosKey,samExudadosKey}) {
  const [msg, setMsg] = useState("");
  const [token,setToken]  = useState(localStorage.getItem("tokends"))
  const navegate = useNavigate();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showtoast, setShowToast] = useState(false);
  const [imagesData, setImagesData] = useState({});


  const dispatch = useDispatch();
  const onChange_Tab = (key) => {
    console.log(key);
  };
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const callbackDetection = (img) => {
    setLoading(false);
   };
  const onSelectImage = (imagePath,imageName,condition,dataset,yolo,sam) => {

    // Suponiendo que imagePath es el camino relativo de la imagen, ajusta según sea necesario
    const imageUrl = `http://${window.location.hostname}:8000/media/dataset/${imagePath}`;

    const uniqueId = -Math.random(); 
   
    const newFile = {
      uid: uniqueId, 
      name: imageName+".jpg", 
      status: 'done', 
      condition:condition,
      dataset:dataset,
      url: imageUrl,
      yolo:yolo,
      sam:sam,
    };
    setImagesData(newFile)
    setLoading(true);
    dispatch(actionDetectionAdd(newFile, callbackDetection));
  };
  

  useEffect(() => {
    console.log(token)
    if (token == null) {
      //navegate("/login");
    }
  }, [token]);
  return (
    <>
      {token == null && (
        <div style={{height:"200vh"}}>
       
          <div style={{width:"100wv",height:300,background:"#00723fbb"}}>
          <div className="diagonal-container">
      <div className="text-section marginl-2 margint-2">
        <div className="marginb-2" style={{ borderBottom: "1px solid #fff" }}> 
        <h4 className="text-white" >
        AI Model for Detection of Fundus Eye Conditions
</h4>

        </div>

        <p className="text-white">
This AI model is designed to detect and classify the stages of diabetic retinopathy in 
eye fundus from digital images.
</p>
      </div>
      <div className="image-section">
        {/* Aquí puedes insertar tu imagen */}
        <img src={mosaico} alt="Descriptive Alt Text" />
      </div>
    </div>
    </div>

          <div style={{marginLeft:"30px",marginRight:"30px"}}>

      
        
          
<div className="d-flex justify-content-between " style={{height:"calc(100vh - 129px)",marginTop:50}}>
<div className="d-flex justify-content-start shadow w-50 border-end" >
<FundusDiseases onSelectImage={onSelectImage}  ></FundusDiseases>
    </div>
    <div style={{marginTop:0,paddingTop:0}} className=" w-50">
    {
      imagesData.name  && (
<>
<div className="w-100 margin-1">
<CardModelResults dataResult={imagesData} loading={loading}/>
</div>

{
  (imagesData.sam || imagesData.yolo) && (
    <>
    <div className="w-100 d-flex margint-2">
      <div className="w-100 card-same-size marginr-1 margint-1 marginl-1">
        <CardModelYOLOResults loading={loading} />
      </div>
      <div className="w-100 card-same-size marginl-1 margint-1">
        <CardYoloStatistics loading={loading} />
      </div>
    </div>
<div className="d-flex w-100 margint-2 ">
<div className="w-100   card-same-size marginr-1 marginl-1 margint-1">

<CardResultsSam typeFolder={"micro"} imageKey={samMicroKey} title={"Microaneurism Segmentation from SAM Model"} pathyolo={samMicro} loading={loading}/>

</div>
<div className="w-100   marginl-1 margint-1 card-same-size">

<CardResultsSam typeFolder={"hemorragias"} imageKey={samHemoKey} title={"Haemorrhages Segmentation from SAM Model"} pathyolo={samHemorragias}  loading={loading}/>

</div>
</div>
<div className="d-flex w-100 margint-2 ">
 <div className="w-100  marginl-1 marginr-1 margint-1 card-same-size">
 
 <CardResultsSam typeFolder={"exudados"} imageKey={samExudadosKey} title={"Hard Exudates Segmentation from SAM Model"} pathyolo={samExudados} loading={loading}/>

 </div>
 <div className="w-100  marginl-1 margint-1 card-same-size">
 
 <CardResultsSam typeFolder={"exudado_suave"} imageKey={samSoftExudadosKey} title={"Soft Exudates Segmentation from SAM Model"} pathyolo={samSoftExudados} loading={loading}/>

 </div>
 </div>
    </>
  )
}
</>
      )
    }
    {
      !imagesData.name  && (
        <div className="d-flex justify-content-center align-items-center h-100 w-100">

<div className="text-center">
<i style={{fontSize:32}} class="fa-solid fa-magnifying-glass marginb-1"></i>
<h3 style={{fontWeight:600}} >No information</h3>
</div>
</div>
      )
    }

    </div>
</div>
</div>
        </div>
      )}
    </>
  );
}

const mapStateToProps = (state) => ({
  samExudados: state.diagnosisResult?.data[0]?.samExudados, 
  samHemorragias: state.diagnosisResult?.data[0]?.samHemorragias, 
  samMicro: state.diagnosisResult?.data[0]?.samMicro, 
  samSoftExudados: state.diagnosisResult?.data[0]?.samSoftExudados, 
  samExudadosKey: state.diagnosisResult?.data[0]?.imageKey.exudados, 
  samSoftExudadosKey: state.diagnosisResult?.data[0]?.imageKey.softExudates, 
  samMicroKey: state.diagnosisResult?.data[0]?.imageKey.micro, 
  samHemoKey: state.diagnosisResult?.data[0]?.imageKey.hemorragias, 
});

export default connect(mapStateToProps)(Home);
