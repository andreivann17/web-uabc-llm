import React, { useState, useEffect } from "react";
import { Drawer, Button, notification} from "antd";
import Toast from "../../components/toasts/toast.jsx";
import "../../assets/css/pelotas_style.css";
import HeaderNavbar from "../../components/navigation/header_navbar.jsx"
import { useDispatch, connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import logo from "./../../assets/img/logo.png";
import FundusDiseases from "../../components/datasets/fundusDiseasesv2.js";
import { actionDetectionAdd } from "../../redux/actions/detection/detection.js";
import Badge from 'react-bootstrap/Badge';
function Home() {
  const [msg, setMsg] = useState("");
  const [token, setToken] = useState(localStorage.getItem("tokends"));
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showtoast, setShowToast] = useState(false);
  const [imagesData, setImagesData] = useState({});
  const [openDrawer, setOpenDrawer] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [displayImagesFundus, setDisplayImagesFundus] = useState("none");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  const openNotification = (msg) => {
    notification.open({
      message: "Error",
      description: msg,
      icon: <img src={logo} alt="Logo" style={{ width: '32px', height: '40px' }} />,
    });
  };

  const onCloseDrawer = () => {
    setOpenDrawer(false);
  };

  const showDrawer = () => {
    setOpenDrawer(true);
  };

  const callbackDetection = () => {
    setLoading(false);
  };

  const onSelectImage = (imagePath, imageName, condition, dataset, yolo, sam) => {
    const imageUrl = `http://${window.location.hostname}:8000/media/dataset/${imagePath}`;
    const uniqueId = -Math.random();

    const newFile = {
      uid: uniqueId,
      name: `${imageName}.jpg`,
      status: "done",
      condition,
      dataset,
      url: imageUrl,
      yolo,
      sam,
    };

    setImagesData(newFile);
    setLoading(true); // Activa el loader mientras se procesa la imagen
    dispatch(actionDetectionAdd(newFile, callbackDetection));
    onCloseDrawer();

    // Mueve el cuadro blanco a la izquierda y muestra el cuadro negro después de un retraso
    setIsExpanded(true);
    setIsFadingOut(true);
    setTimeout(() => {
      setDisplayImagesFundus("block");
    }, 1200);
  };

  return (
    <>
      {token && (
        <div>
          <Toast msg={msg} setShow={setShowToast} show={showtoast} />
      


          <div style={{ position: 'absolute', top: 0, width: "100%",height:"100vh", background: "#EAEAEA" }}>
            <div className="d-flex justify-content-center w-100 " style={{background: "#EAEAEA"}}>
              {/* Cuadro negro */}
             
              <div className={`container_diagnosis ${isFadingOut ? "fade-out" : ""}`}>
                  <div className={`card_diagnosis `}>
                    <div className={`text-center `} style={{ marginBottom: 40 }}>
                      <h3 className="text-success" style={{ fontWeight: 650 }}>
                        Selecciona una imagen del fondo ojo
                      </h3>
                    </div>
                    <div className={`d-flex justify-content-center w-100 `}>
                      <Button
                        type="secondary"
                        onClick={showDrawer}
                        block
                        className="mt-3 custom-button-secondary"
                        style={{ width: "160px", marginRight: 20 }}
                      >
                        Ver ejemplos
                      </Button>
                      <Button
                        type="primary"
                        block
                        className="mt-3 custom-button"
                        style={{ width: "260px" }}
                      >
                        Seleccionar desde Desktop
                      </Button>
                    </div>
                  </div>
                </div>
                <Drawer
                  title="Large Drawer"
                  placement="left"
                  size="large"
                  onClose={onCloseDrawer}
                  open={openDrawer}
                >
                  <FundusDiseases onSelectImage={onSelectImage} />
                </Drawer>
             
              <div>

              
              <div className={` bg-dark container_display_fundus ${isExpanded ? "expand" : ""}`} >
              </div>

              {/* Cuadro blanco */}
              <div className={`container_results_fundus ${isExpanded ? "expand" : ""}`}>
                <div style={{marginTop:"75px", padding:20}}>
                <div className="bg-light text-dark" style={{borderRadius:8}}>
                  <div className="div_titulo_card_results p-2 text-center">
                  <h4 className="text-warning" style={{fontWeight:650}}>Enferma</h4>
                  </div>
                  <div className="div_body_card p-2 ">
                    <div className="d-flex justify-content-end w-100">
                    <div className="d-flex justify-content-end w-50" style={{background:"#EAEAEA",borderRadius:8}}>
                    <div className="p-2">
                    <Badge className="m-1" bg="warning" text="dark">
        Diabetic Retinopathy
      </Badge>
      <Badge className="m-1" bg="warning" text="dark">
        Pathological Myopia
      </Badge>
                    </div>
                    </div>
                    </div>
                    
                  </div>
                </div>
                </div>
               
              </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps)(Home);
