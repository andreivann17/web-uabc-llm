import { useState } from "react";
import ChartBloodType from "../../charts/chartBloodType";
import ModalExpand from "../../modals/statistics/modalExpand"
import {  Card, Typography, Select, Button  } from "antd";
import {connect} from "react-redux"
function CardBloodType({ cardBloodType }) {
  
    const [isModalOpen,setIsModalOpen] = useState(false)
    const expandOnClick = () =>{
     setIsModalOpen(true)
    }
 

  return (
    <div className="shadow" style={{ marginLeft:15,marginRight:15,marginTop:35,width:"25%" }}>
        <ModalExpand Chart={ChartBloodType} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} title={"Blood Type"}/>
    <Card title={
 <div className="d-flex justify-content-between">
      <div>

        {
           (cardBloodType && cardBloodType.title)&&
        cardBloodType.title
        }
      </div>
      <div>
        <Button onClick={() => expandOnClick()}><i className="fas fa-expand"></i></Button>
      </div>
      </div>
    }>
      <div className="p-2" style={{ width: "100%", height: 500 }}>
      <ChartBloodType  />
      </div>
    </Card>
         </div>
  );
}

const mapStateToProps = (state) => ({
    cardBloodType:state.statistics.data.cardBloodType
});

export default connect(mapStateToProps)(CardBloodType);
