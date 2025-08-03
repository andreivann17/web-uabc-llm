import { useState } from "react";
import ChartMap from "../../charts/chartMap";
import ChartMapMexico from "../../charts/chartMapMexico";
import ModalExpand from "../../modals/statistics/modalExpand"
import {  Card, Typography, Select, Button  } from "antd";
import {connect} from "react-redux"
function CardGender({ cardGender }) {
  
    const [isModalOpen,setIsModalOpen] = useState(false)
    const expandOnClick = () =>{
     setIsModalOpen(true)
    }
 

  return (
    <div className="shadow" style={{ marginLeft:15,marginRight:15,marginTop:35,width:"50%" }}>
        <ModalExpand  Chart={ChartMap} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} title={"Gender"}/>
    <Card title={
 <div className="d-flex justify-content-between align-items-center">
      <div>

      <h6>Registros</h6>

      </div>
      <div>
        <Button onClick={() => expandOnClick()}><i className="fas fa-expand"></i></Button>
      </div>
      </div>
    }>
      <div className="p-2" style={{ width: "100%", height: 500, overflowX:"auto" }}>
      <ChartMapMexico  />
      </div>
    </Card>
         </div>
  );
}

const mapStateToProps = (state) => ({
    cardGender:state.statistics.data.cardGender
});

export default connect(mapStateToProps)(CardGender);
