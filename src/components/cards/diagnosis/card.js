import React from 'react';
import { Card, Col, Row, Image } from 'antd';
import "../../../assets/css/cards.css";

const { Meta } = Card;

const CardDiagnosis = ({ data, onSelectImage,condition,dataset,yolo,sam }) => {
  const handleCardClick = (e, img, name) => {
    // Aquí ya no necesitas verificar si el clic es en la imagen,
    // ya que quieres que todos los clics en la tarjeta llamen a onSelectImage
    
    onSelectImage(img, name,condition,dataset,yolo,sam);
  };

  return (
    <div className="site-card-wrapper w-100" style={{padding:20,overflowY:'scroll',height:"calc(100vh - 320px)"}}>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        {Array.isArray(data) && data.map((record, index) => (
       
            <Card
              hoverable
              style={{ width: '220px', padding: 10, margin: 10,display:"inline-block" }}
              cover={
                <Image
                  height={200}
                  width={"100%"}
                  alt="example"
                  src={`http://${window.location.hostname}:8000/media/dataset/${record.img}`}
                  preview={false} // Vista previa deshabilitada
                />
              }
              onClick={(e) => handleCardClick(e, record.img, record.name)}
            >
              <Meta title={record.name} />
            </Card>
       
        ))}
      </Row>
    </div>
  );
};

export default CardDiagnosis;
