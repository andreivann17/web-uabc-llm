import React, { useState } from "react";
import Header from "../../components/navigation/header.jsx";
import Contenido from "../../components/navigation/content.jsx";
import { Button, Modal, Form, Row, Col } from "react-bootstrap/";
import Toast from "../../components/toasts/toast.jsx";
//import {actionDivisas,actionEditar} from "../../redux/actions/divisas/divisas.js"
import { useEffect } from "react";
import { useDispatch, connect } from "react-redux";
const token = localStorage.getItem("tokends");
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

          <Header title={""} icon={"fas fa-utensils marginr-1 "} />
          <Contenido title={""} icon={"fas fa-utensils marginr-1 "} />
          <div className="Panel_Contenido  marginb-5">
       
            <div className="mt-3"></div>
          </div>
        </>
      )}
    </>
  );
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps)(Home);
