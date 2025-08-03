import React, { useState } from 'react';
import { Card, Col, Row, Image, Dropdown, Menu, Button, Modal } from 'antd';
import { connect } from "react-redux";
import "../../assets/css/cards.css";
import RecordsModal from "../modals/monitor/modaldetailspatient";

const { Meta } = Card;

const PatientRecords = ({ data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [diseaseInfo,setDiseaseInfo] = useState([])
  const [patientInfo,setPatientInfo] = useState([])
  const formatTitleDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const openModal = (index) => {
    setDiseaseInfo(data[index].diseases)
    setPatientInfo([data[index].patient_name,data[index].datetime,data[index].id])
    setIsModalOpen(true);

  };

  const menu = (
    <Menu>
      <Menu.Item key="1">Exportar</Menu.Item>
      <Menu.Item key="2">Eliminar</Menu.Item>
    </Menu>
  );

  return (
    <div className="site-card-wrapper">
          {
      (typeof  data !="undefined"  && data.length >0 )&&
    
      <RecordsModal isConfirmedActive={false} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} dataPatient={patientInfo} dataDisease={diseaseInfo}  />
          }
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
      {
          Array.isArray(data) && data.map((record, index) => (
          
            <Col xs={24} sm={12} md={8} lg={6}>
            
              <Card
                hoverable
                style={{ width: '100%', padding: 10, margin: 10 }}
                cover={
                  <Image
                    height={200}
                    width={"100%"}
                    alt="example"
                    src={`http://${window.location.hostname}:8000${record.diseases[0].detection_img}`} 
                  />
                }
              >
                <Meta title={formatTitleDate(record.datetime)}  />
                
                <div className='margint-2 d-flex justify-content-end'>
             
                  <Button onClick={() => openModal(index)} className='custom-button' type="primary"><i className='fas fa-file marginr-1'></i>Details</Button>
                </div>
              </Card>
            </Col>
          ))
        }
      </Row>
    </div>
  );
};

const mapStateToProps = (state) => ({

});

export default connect(mapStateToProps)(PatientRecords);

