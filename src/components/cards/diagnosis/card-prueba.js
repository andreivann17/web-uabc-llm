import React from 'react';
import { Card, Col, Row, Image } from 'antd';
import "../../../assets/css/cards.css";

const { Meta } = Card;

const PatientRecords = ({ data }) => {
  return (
    <div style={{ overflowX: "auto", padding: "10px" }}>
      <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, 20]}>
        {Array.isArray(data) && data.map((record, index) => (
          <Col key={index} xs={24} sm={12} md={8} lg={6}>
            <Card
              hoverable
              style={{
                width: '224px', // Ancho total de la tarjeta
                margin: '10px', // Margen alrededor de la tarjeta
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
              cover={
                <Image
                  height={224}
                  alt="example"
                  src={`http://${window.location.hostname}:8000/media/dataset/${record.img}`}
                  style={{ objectFit: 'cover', width: '224px', height: '224px' }} // Asegura que la imagen cubra el espacio definido
                />
              }
            >
              <Meta title={record.name} />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default PatientRecords;
