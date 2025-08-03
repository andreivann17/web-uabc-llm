import React, { useState } from 'react';
import { Card, Col, Row, Image, Dropdown, Menu, Button, Modal,Tabs } from 'antd';
import { connect } from "react-redux";
import "../../assets/css/cards.css";
import RecordsModal from "../modals/monitor/modaldetailspatient";
import ODIR from "../diagnosis/odir"
import Aptos from "../diagnosis/aptos"
import Eyepacs from "../diagnosis/eyepacs"
import Hpmi from "../diagnosis/hpmi"
import Universidad from "../diagnosis/universidad"
import Idrid from "../diagnosis/idrid"
import aptos from "../../assets/img/logosDataset/aptos.png"
import odir from "../../assets/img/logosDataset/odir.jpg"
import eyepacs from "../../assets/img/logosDataset/eyepacs.jpg"
import universidad from "../../assets/img/logosDataset/Univ-Nacional-Asuncion.jpg"


const { Meta } = Card;

const PatientRecords = ({ onSelectImage}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [diseaseInfo,setDiseaseInfo] = useState([])
  const [patientInfo,setPatientInfo] = useState([])
  const data = []
  const items = [
    {
      label: (
        <>
          <img width={32} src={aptos} alt="" style={{ marginRight: 5 }} />
          APTOS
        </>
      ),
      key: '1',
      children:<Aptos onSelectImage={onSelectImage}/>,
    },
    {
      label: (
        <>
          <img width={32} src={eyepacs} alt="" style={{ marginRight: 5 }} />
          EyePacs
        </>
      ),
      key: '2',
      children:  <Eyepacs onSelectImage={onSelectImage}/>,
    },
    {
      label: (
        <>
         
          HPMI
        </>
      ),
      key: '3',
      children: <Hpmi onSelectImage={onSelectImage}/>,
    },
    {
      label: (
        <>
         
          IDRID
        </>
      ),
      key: '4',
      children: <Idrid onSelectImage={onSelectImage}/>,
    },
   
    {
      label: (
        <>
          <img width={32} src={odir} alt="" style={{ marginRight: 5 }} />
          ODIR-5K
        </>
      ),
      key: '5',
      children: <ODIR onSelectImage={onSelectImage}/>,
    },
   
   
    
      {
        label: (
          <>
            <img width={32} src={universidad} alt="" style={{ marginRight: 5 }} />
            Universidad Nacional de la Asuncion
          </>
        ),
        key: '6',
        children: <Universidad onSelectImage={onSelectImage}/>,
      },
     
  ];



  return (
    <Tabs className='w-100 p-2' defaultActiveKey="1" items={items}  />

   );
};

const mapStateToProps = (state) => ({

});

export default connect(mapStateToProps)(PatientRecords);

