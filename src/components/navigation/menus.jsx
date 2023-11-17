import React, { useState, useEffect, useRef } from "react";
import "./../../assets/css/menu.css";
import "./../../assets/css/utils.css";
import "./../../assets/css/fontawesome-free-6.1.0-web/css/all.css";
import "./../../assets/css/fontawesome-free-6.1.0-web/css/all.min.css";
import { useNavigate } from "react-router-dom";
import logo from "./../../assets/img/logo.png";
import img from "./../../assets/img/andre.jpg";
import prueba from "./../../assets/img/andre.jpg";
import { Collapse,OverlayTrigger,Popover } from "react-bootstrap/";
import { connect } from "react-redux";
const token = localStorage.getItem("tokends");
const icons = ["fas fa-home", 'fas fa-hospital-user',"fas fa-eye","fas fa-user-doctor", 'fas fa-book', 'fas fa-chart-line', 'fas fa-user', 'fas fa-cogs']
const botones = [
  [["Home", "/"], []],
  [["Patient", "/patient"], []],
  [["Diagnosis AI", "/diagnosis"],[]],
  [["Consult", "/consult"],[]],
  [["Records", "/records"], []],
  [["Statistics", '/statistics'], []],
  [["Users", '/usuarios'], []],
  [["Settings", "/settings"],[]],
]

function Nabvar({ valuenav, privilegios, infoUser }) {
  console.log(valuenav)
  const navegate = useNavigate();
  const [activeButton, setActiveButton] = useState(0);
  const [activeButton2, setActiveButton2] = useState(0);
  const [open, setOpen] = useState(Array(botones.length).fill(false));
  const [showPopover, setShowPopover] = useState(false);
  const buttonRef = useRef(null);
  const popoverRef = useRef(null);

  useEffect(() => {
    // Agregar controlador de eventos al documento para detectar clics fuera del popover y del botón
    const handleClickOutside = (event) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setShowPopover(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      // Remover el controlador de eventos al desmontar el componente
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);
  const handleButtonClick = () => {
    setShowPopover(!showPopover);
  };

  const onState = (pos, subpos, url) => {

    if (url === "-") {
      let newdata = [...open];
      newdata[pos] = !newdata[pos];
      setOpen(newdata);
      setActiveButton2(-1);

    } else {
      // Reinicia el botón activo principal cuando no hay subelementos

      navegate(url);

      setActiveButton(pos);
      setActiveButton2(subpos);


    }

  };
  const popover = (
    <Popover id="popover-basic" ref={popoverRef} style={{minWidth:"350px"}}>
      <Popover.Header as="h3">
        <div className='w-100 d-flex justify-content-center '>
          <div className="border-0 rounded-circle"  style={{ backgroundImage: "url("+img+")" }} id="boxing">

          </div>
        </div></Popover.Header>
      <Popover.Body>
      <div className='w-100 d-flex justify-content-center margint-2 marginb-2'>
          <h5>{"Andre Herrera"}</h5>
        </div>

        <div className="d-block  " >




          <div className="margint-2 mb-1 accesouser3-1" id="div_historialbtnadmin" >
            <button onClick={() => onState(-1,-1,"/history")} className='btn btn-secondary   text-white form-control '>
              History

            </button>

        </div>




          <div className=" d-flex align-items-end" style={{height: "50px"}}>

            <button onClick={() => onState(-1,-1,"/login")} className='btn btn-danger  text-white  form-control btn_salirsesion' >
              Log out
            </button>
          </div>
        </div>
      </Popover.Body>
    </Popover>
  );
  useEffect(() => {
    setActiveButton(parseInt(valuenav));
  }, [valuenav]);
  useEffect(() => {
    //  dispatch(actionPrivilegios()) 

  }, []);
  useEffect(() => {
    if (token == null) {
      navegate("/login");
    }
  }, [token]);

  return (
    <>
<div className=" div_izqarriba">
 <OverlayTrigger trigger="click" placement="left" overlay={popover}>
<button ref={buttonRef} onClick={handleButtonClick} type="button" className="btn btn-gold  rounded-pill text-white btn_imgcuenta ">
  <img className='imgcuenta rounded-circle' alt='' width='35' height='35' src={img}/>

  <h6 className='col-8 text-truncate ' >{"Andre Herrera"} </h6>



</button>
 </OverlayTrigger>

</div>
      {token != null && (

        <div className="div-navbar" style={{ background: "#00723F" }} >
          <div className="justify-content-center d-flex marginb-2  margint-2 div-navbar-img" style={{padding:15}}>
            <img className="img-fluid" alt="" src={logo} />
          </div>

          <div className="w-100">
            {botones.map((value, index) => {

              if (parseInt(privilegios[index]) > 0) {
                return (
                  <>
                    <button

                      className={`w-100 d-block btn btn-success text-white border-0 ${activeButton === index ? "active" : ""}`}
                      style={{
                        height: "50px",
                        borderRadius: "0px",
                        textAlign: "start",
                      }}
                      aria-controls="example-collapse-text"
                      aria-expanded={open[index]}
                      onClick={() => onState(index, "-1", value[0][1])}
                    >
                      <div className="d-flex justify-content-between align-items-center">
                        <div>


                          <div className="d-flex div-navbar-buttons" >
                            <i style={{ fontSize: "20px" }} className={icons[index] + " marginr-1"}></i>
                            <h6>{value[0][0]}</h6>
                          </div>
                        </div>
                        {
                          value[1].length > 0 &&
                          <div className="icon-collapse">
                            {
                              open[index] ? <span class="material-symbols-outlined">
                                expand_more
                              </span> : <span class="material-symbols-outlined">
                                chevron_right
                              </span>
                            }
                          </div>
                        }
                      </div>
                    </button>

                    {value[1].length > 0 && (
                      <Collapse in={open[index]}>
                        <div>
                          {value[1].map((value2, index2) => (

                            <button



                              className={`w-100 btn-success btn d-block text-white border-0 ${(activeButton2 === index2 && activeButton === index) ? "active" : ""}`}



                              onClick={() => onState(index, index2, value2[1])}
                              style={{
                                height: "40px",
                                borderRadius: "0px",
                                textAlign: "start",
                              }}
                            >

                              <div className="marginl-3 div-navbar-buttons">
                                <h6>    {value2[0]}</h6>
                              </div>
                            </button>
                          ))}
                        </div>
                      </Collapse>
                    )}
                  </>

                );
              } else {
                return null;
              }
            })}
          </div>

        </div>

      )}
    </>
  );
}

const mapStateToProps = (state) => ({
  botones: state.menus.botones ?? [],
  privilegios: state.menus.privilegios ?? [2, 2],
  infoUser: state.menus.infoUser ?? { id: "0", nombre: "Andre Herrera", img: prueba }
});

export default connect(mapStateToProps)(Nabvar);