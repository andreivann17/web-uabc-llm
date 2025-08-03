import React, { useState,useImperativeHandle, useEffect } from 'react';
import { Layout, Menu, Avatar, Popover, Button, Typography, Space,Drawer } from "antd";

import "../../assets/css/header.css";
import {connect} from "react-redux"
import logo from "./../../assets/img/logo.png";
import { useNavigate } from 'react-router-dom';
import {
  LogoutOutlined,
  ToolFilled,
} from "@ant-design/icons";
const { Header } = Layout;
const { Text } = Typography;
const Headercomp =({}) => {
    const [open, setOpen] = useState(false);
      const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
    const onClose = () => {
        setOpen(false);
      };

    const showDrawer = () => {
        setOpen(true);
      };


  const handleVisibleChange = (visible) => {
    setVisible(visible);
  };

  const content = (
    <div style={{ width: 300,zIndex:11111111 }}>
      <div style={{ textAlign: "center", marginBottom: 10 }}>
   <div className='d-flex justify-content-center'>
      <div
        style={{
          marginRight: 20,
          backgroundColor: "gold", // o "#FFD700"
          width: 64,
          height: 64,
          borderRadius: "50%" // opcional para hacerlo circular
        }}
      ></div>
   </div>
        <div style={{ marginTop: 10 }}>
          <Text strong>Andre Herrera</Text>
          <br />
          <Text type="secondary" style={{ fontSize: 12 }}>
            andreivann17@gmail.com
          </Text>
        </div>
      </div>
      <Button
        type="primary"
        style={{marginBottom:10}}
        
        block
        icon={<ToolFilled />}
        onClick={() => navigate("/settings")}
      >
        Settings
      </Button>
      <Button
        type="primary"
        danger
        block
        icon={<LogoutOutlined />}
        onClick={() => console.log("Log out")}
      >
        Log out
      </Button>
    </div>
  );
  return (
    <div className=" d-flex align-items-center img_logo_home " style={{
  height: "60px",
  width: "100%",
  position: "fixed",
  top: 0,
  zIndex: "100",
  background: "#00723f",
  boxShadow: "0 2px 6px rgba(0,0,0,0.15)"
}}
>
          <div style={{paddingLeft:"40px",paddingRight:"30px"}} className="d-flex justify-content-between w-100 ">
          <div className="d-flex align-items-center" style={{marginBottom:"3px"}}>
          <img  style={{height:"50px"}} alt="" src={logo} />
          <h6 style={{fontWeight:"550"}}  className="marginl-1 mt-2 text-light">AI</h6>
          </div>
          <div className="d-flex  align-items-center text-light " style={{marginBottom:"5px"}}>
     
      <a  className="styled-link text-light">DOCS</a>
      <a  className="styled-link text-light">MODELS</a>
      <a  className="styled-link text-light">GITHUB</a>
<Popover
  content={content}
  trigger="click"
  placement="bottomRight"
  visible={visible}
  onVisibleChange={handleVisibleChange}
>
  <Button type="text" style={{ color: "white" }}>
    <Space>
      <div
        style={{
          marginRight: 20,
          backgroundColor: "gold", // o "#FFD700"
          width: 20,
          height: 20,
          borderRadius: "50%" // opcional para hacerlo circular
        }}
      ></div>
    </Space>
  </Button>
</Popover>
 
      <Drawer title="Settings" onClose={onClose} open={open}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </div>
          </div>
          </div>
  );
}


const mapStateToProps = (state) => ({

});

export default connect(mapStateToProps)(Headercomp);