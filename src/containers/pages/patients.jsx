import React, { useState, useEffect } from "react";
import Header from "../../components/navigation/header.jsx";
import Contenido from "../../components/navigation/content.jsx";
import CardInfo from "../../components/cards/patients/cardInfo.js";
import CardCount from "../../components/cards/patients/cardDetectionsCount.js";
import { useDispatch } from "react-redux";
import ModalMalignus from "../../components/modals/patients/detectedMalignusRecords.js"
import backgroundImage from "../../assets/img/backgroundPatients.jpg";
import {actionPatientGet,actionPatientMalignusGet} from "../../redux/actions/patients/patients.js";
import ModalEdit from "../../components/modals/patients/patientsEdit.js"
import Dashboard from "../../components/cards/statistics/cardPointDetection.js";

const token = localStorage.getItem("tokends");

function Home({ }) {
  const dispatch = useDispatch();
  const [isModalEditOpen, setIsModalEditOpen] = useState(false)
  const [isModalMalignusOpen, setIsModalMalignusOpen] = useState(false)

  useEffect(() => {
    dispatch(actionPatientGet());
    dispatch(actionPatientMalignusGet())

  }, []);

  return (
    <>
      {token !== null && (
        <>
        <ModalMalignus setIsModalOpen={setIsModalMalignusOpen} detailID={""} isModalOpen={isModalMalignusOpen}/>
        <ModalEdit  setIsModalOpen={setIsModalEditOpen} detailID={""} isModalOpen={isModalEditOpen}/>
          
          <Header title={"Info"} icon={"fas fa-hospital-user marginr-1 "} />
          <Contenido  backgroundImage={backgroundImage}  title={"Info"}  icon={"fas fa-hospital-user marginr-1 "}  />

          <div className="Panel_Contenido  marginb-5">
            <>
              <div style={{ display: "flex", justifyContent: "space-between",alignItems: "stretch", }}>

            <CardInfo setIsModalEditOpen={setIsModalEditOpen}/> 
            <CardCount setIsModalMalignusOpen={setIsModalMalignusOpen}/>
        
            </div>
         <div style={{marginTop:80}}>
         <Dashboard  />
         
         </div>
            </>
          </div>
        </>
      )}
    </>
  );
}


export default Home
