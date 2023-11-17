import React, { useEffect, useState } from "react";
import Header from "../../components/navigation/header.jsx";
import Contenido from "../../components/navigation/content.jsx";
import Toast from "../../components/toasts/toast.jsx";
import backgroundImage from "../../assets/img/backgroundPatients.jpg";
import { message, Upload, Button, Steps } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import { actionDetectionAdd } from "../../redux/actions/detection/detection.js";
import { useDispatch, connect } from "react-redux";



function Home({}) {
  const [msg, setMsg] = useState("");
  const [showtoast, setShowToast] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const dispatch = useDispatch()

  useEffect(() => {
      if (fileList.length > 0) {
          setCurrentStep(1);
      } else {
          setCurrentStep(0);
      }
  }, [fileList]);

  const handleChange = (info) => {
      let fileList = [...info.fileList];
      fileList = fileList.slice(-5);  // Limit to the last 5 items
      setFileList(fileList);  // Update the state

      if (info.file.status === "done") {
          message.success(`${info.file.name} file uploaded successfully.`);
      } else if (info.file.status === "error") {
          message.error(`${info.file.name} file upload failed.`);
      }
  };

  const customRequest = ({ onSuccess }) => {
      setTimeout(() => {
          onSuccess("ok");
      }, 0);
  };

  const btn_results = () => {

    
    dispatch(actionDetectionAdd())
  };

  
    return (
        <>
            <Toast msg={msg} setShow={setShowToast} show={showtoast} />
            <Header title={"Diagnosis AI"} icon={"fas fa-eye marginr-1 "} />
            <Contenido backgroundImage={backgroundImage} title={"Diagnosis AI"} icon={"fas fa-eye marginr-1 "} />
            <div className="margin-3" style={{minHeight:400}}>

            <div className="marginb-2 ">
                    <Steps size="small" current={currentStep}>
                        <Steps.Step title="Paso 1" description="Escoger imágenes" />
                        <Steps.Step title="Paso 2" description="Enviar imagen y esperar" />
                    </Steps>
                </div>

                <div className="d-flex w-100 justify-content-start">
              
                    <div className="w-50 bg-white p-3 m-2">
                    <Upload
                        className=""
                        action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                        listType="picture"
                        fileList={fileList}
                        onChange={handleChange}
                        customRequest={customRequest}
                       
                    >
                        <Button icon={<UploadOutlined />}>Upload</Button>
                    </Upload>

                    </div>
               
                    <div className="d-flex flex-column justify-content-center align-items-center m-2" style={{ flex: 1, minHeight: "200px" }}>
                    <Button onClick={() => btn_results()} className="mb-2" style={{width:"260px",height:120}}>
        <i style={{fontSize:18}} className="fas fa-eye"></i>
        <h4>Ver resultados</h4>
    </Button>
   

</div>


                </div>
            </div>
        </>
    );
}

const mapStateToProps = (state) => ({});
export default connect(mapStateToProps)(Home);
