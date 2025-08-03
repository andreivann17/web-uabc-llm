import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import { connect } from 'react-redux';
const customButtonStyle = {
    backgroundColor: '#00723f', // Color verde
    borderColor: '#00723f',
    color: '#fff',
  };
const App = ({ isModalOpen, setIsModalOpen, detailID,dataDisease, dataPatient }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [fileList, setFileList] = useState([]);
    const [disease,setDisease] = useState("")
    const [indexImageList, setIndexImageList] = useState(0);
    const [imagesData, setImagesData] = useState([]);
  const [imagesList, setImageList] = useState([]);
    const [typeImage,setTypeImage] = useState("original")
    const onChangeImage = (value) => {
        console.log(imagesList);
        console.log(indexImageList);
        console.log(value)
        console.log("---------------")
        setSelectedImage(imagesList[indexImageList][value]);
        setTypeImage(value)
      };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const selectImage = (index) => {
    setSelectedImage(imagesList[index]["original"]);

    setIndexImageList(index);
    setDisease(imagesList[index]["prediction"])
    setTypeImage("original")
    

  };


  return (
    <Modal 
    title="Detailed Information" 
    visible={isModalOpen} 
    onCancel={handleCancel}
    className="dark-modal" 
    footer={null}
    width="80%" // Hace el modal grande
    style={{ backgroundColor: '#000', top: 20 }} // Ajusta la posición del modal y aplica fondo oscuro
    bodyStyle={{ backgroundColor: '#000', color: '#fff' }} // Aplica tema oscuro al cuerpo del modal
    okButtonProps={{ style: customButtonStyle }}
  >
    {/* Estilos adicionales */}
      <style jsx>
        {`
          .dark-modal .ant-modal-content {
            background-color: #000;
            transition: all 0.3s; // Transición al mostrar el modal
          }
          .dark-modal .ant-modal-header {
            border-bottom: 1px solid #000;
            background-color: #000;
          }
          .dark-modal .ant-modal-title {
            color: #aaa;
          }
          .dark-modal .ant-modal-close-x {
            color: #aaa;
          }
          .dark-modal .ant-modal-body {
            background-color: #000;
          }
          .image-list-item {
            // Estilo para cada imagen de la lista
            border-bottom: 2px solid #00723f;
            transition: transform 0.1s;
          }
          .image-list-item:active {
            // Efecto al hacer clic en la imagen
            transform: scale(0.95);
          }
          .image-list-item img {
            // Estilo para la imagen dentro del item
            border-bottom: 2px solid #00723f;
          }
        `}
      </style>
      <div className='d-flex justify-content-between margint-2 ' style={{marginBottom:100}}>
      <div>
      <div className='d-flex ' >
            <h6 className='text-ligth'>Name:</h6> 
            <h6 className='text-white' style={{marginLeft:"10px"}}>{dataPatient[0]}</h6>
        </div>
        <div className='d-flex' >
            <h6 className='text-ligth'>Date:</h6> 
            <h6 className='text-white' style={{marginLeft:"20px"}}>{dataPatient[1]}</h6>
        </div>
      </div>
      <div>
      <Button   className='custom-button-secondary marginr-1' type="secundary"><i className='fas fa-close marginr-1'></i>Cerrar</Button>
      <Button  className='custom-button' type="primary"><i className='fas fa-share marginr-1'></i>Enviar Resultados</Button>
      </div>
      </div>
      <div
          style={{
            display: "flex",
            minHeight:"calc(100vh - 120px)",
            width: "100%",
          }}
        >

              {/* Lista de imágenes */}
          <div
            style={{
              flex: "10%",
              paddingRight: "20px",
              borderRight: "1px solid #333",
              borderLeft: "0px",
              height: "90vh",
              overflowY: "auto",
            }}
            className="p-2"
          >
            {dataDisease.map((disease, index) => (
              <div
                key={index}
                className="image-list-item"
                style={{
                  marginBottom: "10px",
                  borderRadius: "5px",
                  border: "solid #333 0.5px",
                  borderTop: "none",
                  borderLeft: "none",
                  paddingBottom: "20px",
                  borderRight: "none",
                  backgroundColor: "#000",
                }}
              >
                <p style={{ color: "#aaa", textAlign: "center" }}>
                  {disease.image_name}
                </p>
                <img
                 src={`http://${window.location.hostname}:8000${disease.detection_img}`}
                  alt="selected"
                  style={{ width: "100%", cursor: "pointer", opacity: "0.8" }}
                  onClick={() => selectImage(index)}
                />
              </div>
            ))}
          </div>
      <div
            style={{
              flex: "10%",
              paddingRight: "20px",
              borderRight: "1px solid #333",
              borderLeft: "0px",
              height: "90vh",
              overflowY: "auto",
            }}
            className="p-2"
          >
            {imagesData.map((imgUrl, index) => (
              <div
                key={index}
                className="image-list-item"
                style={{
                  marginBottom: "10px",
                  borderRadius: "5px",
                  border: "solid #333 0.5px",
                  borderTop: "none",
                  borderLeft: "none",
                  paddingBottom: "20px",
                  borderRight: "none",
                  backgroundColor: "#000",
                }}
              >
                <p style={{ color: "#aaa", textAlign: "center" }}>
                  {fileList[index]?.name}
                </p>
                <img
                  src={imgUrl}
                  alt="selected"
                  style={{ width: "100%", cursor: "pointer", opacity: "0.8" }}
                  onClick={() => selectImage(index)}
                />
              </div>
            ))}
          </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems:"center", flexWrap: 'wrap' }}>
     
      {dataDisease.map((disease, index) => (
        <>
         
       
          <div key={index} style={{ margin: 10, textAlign: 'center' }}>
            <img   src={`http://${window.location.hostname}:8000${disease.detection_img}`}  alt={disease.detection_name} style={{ maxWidth: '50%', maxHeight: "80%" }} />
            <div style={{ color: '#fff', marginTop: 5 }}>{disease[0]}</div>
          </div>
          </>
        ))}
      </div>
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  data: state.records.data ?? [],
  // Supongo que imagesData se pasa aquí

});

export default connect(mapStateToProps)(App);
