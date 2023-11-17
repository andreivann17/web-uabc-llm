import React, { useEffect,useState } from "react";
import Header from "../../../components/navigation/header";
import Contenido from "../../../components/navigation/contenido";
import {Form,Dropdown} from "react-bootstrap"
import {connect, useDispatch} from "react-redux"
import Dashboardcard from "../../../components/cards/dashboardCard"
import { actionDashboard,actionDashboardDetailsRegistros,actionDashboardGeneral,actionDashboardRegistros } from "../../../redux/actions/dashboard/dashboard";
import { useParams } from "react-router";
const fecha = new Date();
const ano = fecha.getFullYear();
const token = localStorage.getItem("tokends");
const mes = (fecha.getMonth() + 1).toString().padStart(2, "0");
function Home({ title,fechas,meses,countCard}) {
  console.log(fechas)
  const dispatch = useDispatch()
  const [inputfecha, setInputFecha] = useState(`${ano}-${mes}`);
  let { id } = useParams();
  useEffect(() => {
    dispatch(actionDashboard({"clave":id,"fecha":inputfecha}))
    dispatch(actionDashboardGeneral({"clave":id,"fecha":inputfecha}))
  }, [inputfecha]);
 
  return (
    <>
      {token != null && (
        <div>
           <Header
            title={title}
            icon={'fas fa-utensils marginr-1 '}
          >

          </Header>

          <div className="Panel_Contenido   marginb-5">
            <Contenido
              title={title}
              icon={'fas fa-utensils marginr-1 '}    
            >
      <div className="w-100">      
 

          </div> 
            </Contenido>
            <div className="marginb-1  d-flex justify-content-end">
            <div className=" col-3">
              <Form.Select
                onChange={(ev) => setInputFecha(ev.target.value)}
                className="mb-3 "
              >   
                {meses.map(
                    (item, index) =>
                    <option value={fechas[index]}   selected={fechas[index] == inputfecha}>
                    {item}
                  </option>
                  )}
              </Form.Select>
            </div>
          </div> 
          <Dashboardcard/>
            
          </div>
        

        </div>
      )}
    </>
  );
}
const mapStateToProps = (state) => ({
  meses: state.dashboard.dashboard.meses?.meses ?? [],
  fechas:state.dashboard.dashboard.meses?.fechas,
  countCard:state.dashboard.dashboard.countCard??[],
});
export default connect(mapStateToProps)(Home);
 
