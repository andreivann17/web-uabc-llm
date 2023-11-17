import React, { useState } from "react";
import { Image } from "react-bootstrap/";

//import {actionDivisas,actionEditar} from "../../redux/actions/divisas/divisas.js"
import { useEffect } from "react";
import { useDispatch, connect } from "react-redux";
import img from "../../assets/img/404.png"
const token = localStorage.getItem("tokends");
function Home({}) {
  const [msg, setMsg] = useState("");
  const [showtoast, setShowToast] = useState(false);

  useEffect(() => {
    // dispatch(actionDivisas())   style={{width:"calc(100vw - 60px)"}}
  }, []);
  return (
    <div className="w-100" style={{background:"#0591cf"}}> 
      {token != null && (
        <div className="d-flex justify-content-center" style={{background:"#0591cf"}}>
         <Image style={{height:"calc(100vh)"}} src={img} alt="" fluid />
         
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps)(Home);
