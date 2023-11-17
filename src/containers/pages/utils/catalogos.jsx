import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../../../components/navigation/header';
import Contenido from "../../../components/navigation/contenido"
import '../../../assets/css/cards.css';
import OffcanvasBuscar from '../../../components/offcanvas/offcanvasFiltrarCatalogos';
import img_empresa from './../../../assets/img/logo.png';
import { actionOpeShow, actionCatalogos } from '../../../redux/actions/catalogos/catalogos.js';
import { connect, useDispatch } from 'react-redux';
import ModalFormMap from '../../../map/modalForm.js';
import { OverlayTrigger, Tooltip,Overlay,Popover,Dropdown,Button } from 'react-bootstrap';
const token = localStorage.getItem('tokends');
const socket = new WebSocket('ws://' + window.location.hostname + ':8000' + '/ws/app/principal/');
socket.addEventListener('open', (event) => {
  console.log('Conexión WebSocket abierta');
});
socket.addEventListener('close', (event) => {
  console.log('Conexión WebSocket cerrada');
});
const componentsByURL = { ...ModalFormMap };

function Catalogos({ title, titleButton, data }) {
  const SelectedComponent = componentsByURL[window.location.pathname];
  const [showAdd, setShowAdd] = useState(false);
  const [showFiltrar, setShowFiltrar] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [overlayTarget, setOverlayTarget] = useState(null);

  const navigate = useNavigate()
  const dispatch = useDispatch();
  const openShow = async () => {
    dispatch(actionOpeShow(() =>setShowAdd(true)));
  };
  
   const callback = () =>{
    dispatch(actionCatalogos({
      limit: "0",
      buscador: "",
      value: "15",
    }));
   }
  const handleRightClick = (event) => {
    event.preventDefault();
    setShowOverlay(true);
    setOverlayTarget(event.target);
    document.body.classList.add('hide-scrollbar');
  };
 
  const handleOverlayClose = () => {
    setShowOverlay(false);
    document.body.classList.remove('hide-scrollbar');
  };
  const boton_click = (url) =>{
    navigate(url)
  }
  return (
    <>
       <OffcanvasBuscar setShow={setShowFiltrar} show={showFiltrar} />
          <SelectedComponent show={showAdd} callback={callback} setShow={setShowAdd} title={title} />
      {token != null && (
        <>
        <Header
        title={title}
        icon={'fas fa-utensils marginr-1 '}
      >

      <button
      onClick={() => openShow()}
      
      className="btn btn-primary marginr-1"
    >  
    <i className={"fas fa-plus marginr-1"}></i>         
      
      { titleButton}
    </button>
       

      </Header>

      <div className="Panel_Contenido   marginb-5">
        <Contenido
          title={title}
          icon={'fas fa-utensils marginr-1 '}    
        >


    <>
    <button         
    onClick={() => openShow()}
       className="marginr-1 btn btn-primary-osmed">

 
<div className="d-flex align-items-center">
<span className="material-symbols-outlined marginr-1">
           add
          </span>        
    
      {`Agregar ${titleButton}`}
</div>
    </button>
  

  <Dropdown>
  <Dropdown.Toggle variant=""  className="btn-outline-secondary-osmed  border-0 rounded-circle custom-toggle" >

  <i class="fa-solid fa-ellipsis"></i>
  </Dropdown.Toggle>

    <Dropdown.Menu>
      
    <Dropdown.Item onClick={()=>setShow(true)}>Filtrar</Dropdown.Item>
    <Dropdown.Item >Exportar Empleados</Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
  
  </>
 

        </Contenido>
             
        <div>
              {data.length > 0 &&
                data.map((item) => {
                  const { id, nombre,img } = item;
                 
                  let  imageUrl = `/media/${titleButton+"_"+id+".jpg"}` 
                
                  // URL de la imagen en el directorio de medios
                  return (
              <>
                      <OverlayTrigger
                        trigger="contextmenu"
                        placement="right"
                        overlay={
                          <Tooltip id="button-tooltip-2">Check out this avatar</Tooltip>
                        }
                      >
                        <button
                        onClick={() => boton_click(`${window.location.pathname}/${id}`)}
                          onContextMenu={handleRightClick}
                        
                 
                          className="btn-outline-primary-osmed border-0 btn shadow-lg marginr-1 marginl-1"
                        >
                        
                  
                          <div className="d-flex justify-content-center mt-2">
                          { (img == 1) && (
                        <img className="div_backimgs" src={imageUrl} alt="" />
                      )}
                            {(img  == 0) && (
                              <div
                                className="div_backimgs "
                                style={{ backgroundColor: 'var(--bs-light)' }}
                              >
                                <img
                                  className="img-fluid logoempresa p-4 marginb-4"
                                  alt=""
                                  src={img_empresa}
                                />
                              </div>
                            )}
                          </div>
                          <div className="cardcatalogocontent d-flex flex-column align-items-start marginl-1">
                            <div className="d-flex justify-content-between align-items-center">
                              <h5 className="card-title inlineblock">{nombre}</h5>
                            </div>
                          </div>
                        </button>
                      </OverlayTrigger>
                      {/* Renderizar el overlay */}
                      {showOverlay && overlayTarget && (
                        <Overlay
                          show={showOverlay}
                          target={overlayTarget}
                          placement="right"
                          autoCorrect={false}
                          onHide={handleOverlayClose}
                          rootClose
                          
                        >
                          <Popover id="popover-positioned" style={{width:"200px"}}>
                            <Popover.Header as="h3">Detalles</Popover.Header>
                            <Popover.Body>
                           <div className='d-block w-100'>
                              <button className='btn w-100 btn-primary d-block marginb-1'>Editar</button>
                              <button className='btn w-100 btn-danger marginb-1 d-block'>Eliminar</button>
                           </div>
                            </Popover.Body>
                          </Popover>
                        </Overlay>
                      )}
           </>
                  );
                })}
   
            </div>
        </div>
        </>

      )}
    </>
  );
}

const mapStateToProps = (state) => ({
  data: state.catalogos.catalogos.contenido ?? [],
});

export default connect(mapStateToProps)(Catalogos);
