import { useState } from "react";
import ChartGender from "../../charts/chartGender";
import ModalExpand from "../../modals/statistics/modalExpand"
import {  Card, Typography, Select, Button  } from "antd";
import {connect} from "react-redux"
function CardGender({ cardGender }) {
  
    const [isModalOpen,setIsModalOpen] = useState(false)
    const expandOnClick = () =>{
     setIsModalOpen(true)
    }
 

  return (
    <div className="shadow" style={{ marginLeft:15,marginRight:15,marginTop:35,width:"25%" }}>
        <ModalExpand Chart={ChartGender} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} title={"Gender"}/>
    <Card title={
 <div className="d-flex justify-content-between">
      <div>

        {
           (cardGender && cardGender.title)&&
        cardGender.title
        }
      </div>
      <div>
        <Button onClick={() => expandOnClick()}><i className="fas fa-expand"></i></Button>
      </div>
      </div>
    }>
      <div className="p-2" style={{ width: "100%", height: 500 }}>
      <ChartGender  />
      </div>
    </Card>
         </div>
  );
}

const mapStateToProps = (state) => ({
    cardGender:state.statistics.data.cardGender
});

export default connect(mapStateToProps)(CardGender);
