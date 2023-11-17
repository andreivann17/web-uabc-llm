import React, { useState } from 'react';
import { Card, Col, Row, Image, Dropdown, Menu, Button, Modal } from 'antd';
import { connect } from "react-redux";
import "../../assets/css/cards.css";
import RecordsModal from "../modals/records/recordsDetails";

const { Meta } = Card;

const PatientRecords = ({ data }) => {
  console.log(data)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [detailID, setDetailID] = useState("-1");

  const formatTitleDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const openModal = (id) => {
    setDetailID(id);
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
      <RecordsModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} detailID={detailID} />
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        {
          (typeof data !== "undefined" && data.length > 0) &&
          data.map((record, index) => (
          
            <Col xs={24} sm={12} md={8} lg={6}>
            
              <Card
                hoverable
                style={{ width: '100%', padding: 10, margin: 10 }}
                cover={
                  <Image
                    height={200}
                    width={"100%"}
                    alt="example"
                    src={`http://${window.location.hostname}:8000${record.detection_img}`} 
                  />
                }
              >
                <Meta title={formatTitleDate(record.datetime)} description={"Diagnosis: " + ((record.diseases && record.diseases.length > 0 && record.diseases[0].disease_name) ? <p  className='inlineblock marginl-1 text-danger ' >Positive</p> : "Negative")} />
                
                <div className='margint-2 d-flex justify-content-end'>
                  <Dropdown className='marginr-1 border-0' overlay={menu}>
                    <Button shape="circle" icon={<i className="fa-solid fa-ellipsis"></i>}/>
                  </Dropdown>
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

