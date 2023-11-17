import React, { useState } from 'react';
import { Button, Modal, Card, Image } from 'antd';
import {connect} from "react-redux"

const { Meta } = Card;

const App = ({isModalOpen, setIsModalOpen, detailID, data}) => {
   
  const [modalWidth, setModalWidth] = useState(900);  // Set the width of the modal
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [exportModalViewOpen, setExportModalViewOpen] = useState(false);
  const [exportModalAllViewOpen, setExportModalAllViewOpen] = useState(false);
  const [dataModal,setDataModal] = useState({})
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const formatTitleDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };
  
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleShowViewModal = (title) =>  {
    setExportModalViewOpen(true)
    console.log(title)
    setDataModal(title)
  }

  const handleExportClick = () => {
    setExportModalOpen(true);
  }

  const handleExportModalCancel = () => {
    setExportModalOpen(false);
  }
console.log(detailID)
  return (
    <>
      {
        detailID !="-1" &&
        <Modal title="Detailed Information" visible={isModalOpen} onCancel={handleCancel}  width={modalWidth} footer={null} cancelButtonProps={{ style: { display: 'none' } }}>
          <div style={{display: 'flex', marginTop: 40}}>
            <Image
              width={400}
              style={{borderRadius: 6}}
              src={`http://${window.location.hostname}:8000${data[detailID].detection_img}`} 
            />
            <div style={{marginLeft: '20px'}}>
              <p>Additional information here</p>
              <p>Date: {formatTitleDate(data[detailID].datetime)}</p>
              <div className='d-flex'>

              <p>{"Diagnosis: " + ((data[detailID].diseases && data[detailID].diseases.length > 0 && data[detailID].diseases[0].disease_name) ? "": "Negative")}</p>

              {
                   (data[detailID].diseases && data[detailID].diseases.length > 0 && data[detailID].diseases[0].disease_name) &&
                 
             
                    <p  className='inlineblock marginl-1 text-danger ' >Positive</p> 
                }
            
              </div>
         
              <div className='marginb-2'>
                {
                   (data[detailID].diseases && data[detailID].diseases.length > 0 && data[detailID].diseases[0].disease_name) &&
                   data[detailID].diseases.map((value) => (
             
                <p  className='inlineblock text-danger marginr-1 text-underline ' onClick={() => handleShowViewModal(value)} style={{color:"#00723f"}}>{value.disease_name}</p>
                ))}
              </div>
              <Button onClick={handleExportClick}>Export</Button>
            </div>
          </div>
        </Modal>
      }

      <Modal title="Export Options" visible={exportModalOpen} onCancel={handleExportModalCancel} footer={null} cancelButtonProps={{ style: { display: 'none' } }}>
          <div className='margint-3'>
          <Button type="primary" style={{marginRight:10}}>DICOM</Button>
          <Button type="primary" style={{marginRight:10}}>JPG</Button>
          <Button type="primary" style={{marginRight:10}}>PDF</Button>
          </div>
      </Modal>
      <Modal width={800} title={dataModal.disease_name} visible={exportModalViewOpen} onCancel={() => setExportModalViewOpen(false)} footer={null} cancelButtonProps={{ style: { display: 'none' } }}>
          <div className='margint-3 d-flex'>
          <div>
          <Image
              width={400}
              style={{borderRadius: 6}}
              src={`http://${window.location.hostname}:8000${dataModal.disease_img}`} 
            />
          </div>
          <div>
          <div className='marginl-1 marginb-3 d-flex'>
            <h6 className='marginr-1'>Prediccion:</h6>
            <h6 style={{fontWeight:600}}>55%</h6>
          </div>
          <div className='marginl-1 text-primary'>
            - Liquido Retiriniano
          </div>
          </div>
          </div>
      </Modal>
      <Modal title="View" visible={exportModalAllViewOpen} onCancel={() => setExportModalAllViewOpen(false)} footer={null} cancelButtonProps={{ style: { display: 'none' } }}>
          <div className='margint-3'>
          
          </div>
      </Modal>
    </>
  );
};

const mapStateToProps = (state) => ({
    data: state.records.data ?? [],
});
  
export default connect(mapStateToProps)(App);
