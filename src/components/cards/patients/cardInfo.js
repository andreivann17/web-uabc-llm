import React, { useState } from "react";
import { Card, Space, Dropdown, Button, Typography, Menu } from "antd";
import { connect } from "react-redux";
import moment from "moment";
const { Meta } = Card;
const { Title, Text } = Typography;

const CardInfo = ({ data, setIsModalEditOpen }) => {
  const formatTitleDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };
  const menu = (
    <Menu>
      <Menu.Item key="1">
        <i class="fa-solid fa-file-pdf marginr-1"></i>
        PDF
      </Menu.Item>
      <Menu.Item key="2">
        <i class="fa-solid fa-file-excel marginr-1"></i>
        EXCEL
      </Menu.Item>
    </Menu>
  );
  return (
    <div
      style={{
        width: "49%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Card
        style={{
          marginTop: 16,
          boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
          flex: 1,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <div className="d-flex align-items-center" style={{ flexGrow: 1 }}>
            <i
              style={{ color: "#00723F", fontSize: 22, marginBottom: 5 }}
              className="fas fa-info-circle marginr-1 "
            ></i>
            <h5 style={{ fontWeight: "600" }}>Patient Information</h5>
          </div>
          <div>
            <Button
              className="custom-button marginr-1"
              type="primary"
              onClick={() => setIsModalEditOpen(true)}
            >
              <i className="fas fa-edit marginr-1"></i>Edit
            </Button>
           
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12 col-md-3">
            <img
              src={`http://${window.location.hostname}:8000/media/patients/${
                data.id
              }.jpg?${Date.now()}`}
              alt="Imagen del paciente"
              className="img-fluid"
            />
          </div>
          <div className="col-sm-12 col-md-9">
            <Title level={5}>
              Name: {`${data.first_name} ${data.last_name}`}
            </Title>
            <br />
            <div>
              <Text>Age: {moment().diff(data.birth_date, "years")}</Text>
            </div>
            <br />
            <div className="margint-">
              <Text>Gender: {data.gender_name}</Text>
            </div>
            <br />
            <div>
              <Text>Blood Type: {data.blood_type_name}</Text>
            </div>
            <br />
            <div>
              <Text>Birth Date: {formatTitleDate(data.birth_date)}</Text>
            </div>
            <br />
            <div>
              <Text>Email: {data.email}</Text>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

const mapStateToProps = (state) => ({
  data: state.patients.data,
});

export default connect(mapStateToProps)(CardInfo);
