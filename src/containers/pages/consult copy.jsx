import React, { useState } from "react";
import Header from "../../components/navigation/header.jsx";
import Contenido from "../../components/navigation/content.jsx";
import { Button, Modal, Form, Row, Col } from "react-bootstrap/";
import Toast from "../../components/toasts/toast.jsx";
//import {actionDivisas,actionEditar} from "../../redux/actions/divisas/divisas.js"
import { useEffect } from "react";
import { useDispatch, connect } from "react-redux";

import { message, Upload,Steps } from 'antd';
const description = 'This is a description.';
const { Dragger } = Upload;
const props = {
  name: 'file',
  multiple: true,
  action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
  onChange(info) {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log('Dropped files', e.dataTransfer.files);
  },
};
const token = localStorage.getItem("tokends");
const steps = [
  {
    title: 'First',
    content: 'First-content',
  },
  {
    title: 'Second',
    content: 'Second-content',
  },
  {
    title: 'Last',
    content: 'Last-content',
  },
];
function Home({}) {
  const [msg, setMsg] = useState("");
  const [showtoast, setShowToast] = useState(false);

  useEffect(() => {
    // dispatch(actionDivisas())
  }, []);
  return (
    <>
      {token != null && (
        <>
          <Toast msg={msg} setShow={setShowToast} show={showtoast} />
          <>
    <div className='w-100 d-flex   align-items-center' style={{"height":"100vh",justifyContent:'center',alignContent:"center"}}>

   <div className='d-block w-100 ' style={{"height":"100vh"}}>

    <Steps
    current={1}
    items={[
      {
        title: 'Finished',
        description,
      },
      {
        title: 'In Progress',
        description,
        subTitle: 'Left 00:00:08',
      },
      {
        title: 'Waiting',
        description,
      },
    ]}
  />
    
  <Dragger {...props}>
    <p className="ant-upload-drag-icon">
    <i style={{ fontSize: "20px",color:"#00723F" }} className="fas fa-eye marginr-1"></i>
    </p>
    <p className="ant-upload-text">Click or drag file to this area to upload</p>
    <p className="ant-upload-hint">
      Support for a single or bulk upload. Strictly prohibited from uploading company data or other
      banned files.
    </p>
  </Dragger>
  </div>
  </div>
          </>
        </>
      )}
    </>
  );
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps)(Home);
