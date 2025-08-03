import { useState } from "react";
import ChartModelResults from "../../charts/chartModelResults";
import ModalExpand from "../../modals/statistics/modalExpand"
import ModalInfo from "../../modals/clasification/modalinfo"
import ModalTable from "../../modals/clasification/modaltable"
import {  Card, Typography, Select, Button  } from "antd";
import {connect} from "react-redux"
function CardBloodType({ IDCondition,NameCondition,dataResult,loading }) {
  
    const [isModalOpen,setIsModalOpen] = useState(false)
    const [isModalInfoOpen,setIsModalInfoOpen] = useState(false)
    const [isModalTableOpen,setIsModalTableOpen] = useState(false)
    const expandOnClick = () =>{
     setIsModalOpen(true)
    }
    const infoOnClick = () =>{
        setIsModalInfoOpen(true)
    }
    const tableOnClick = () =>{
        setIsModalTableOpen(true)
    }

  return (
    <div className="shadow" style={{ marginLeft:15,}}>
        <ModalExpand Chart={ChartModelResults} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} title={"Predictions from 37 Classes Model"}/>
        <ModalInfo isModalOpen={isModalInfoOpen} setIsModalOpen={setIsModalInfoOpen} dataResult={dataResult}/>
        <ModalTable isModalOpen={isModalTableOpen} setIsModalOpen={setIsModalTableOpen} />
        <Card
      loading={loading}
      title={
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>Predictions from 37 Classes Model</div>
        <div>
        <Button onClick={infoOnClick} className="marginr-1" icon={<i className="fas fa-info" />} />
          <Button onClick={tableOnClick}  className="marginr-1" icon={<i className="fas fa-table" />} />
          <Button onClick={expandOnClick}  icon={<i className="fas fa-expand" />} />
        </div>
        </div>
      }
      style={{ width: "100%" }} // Adjust width as necessary
    >
      <div className="p-2 border-bottom" style={{ height: 250 }}>
        {/* Assuming ChartModelResults is a defined component */}
        <ChartModelResults />
      </div>
      {/* Footer with additional actions or information */}
      <div className="" style={{ marginTop: "10px", textAlign: "center" }}>
        <div>
            <h6>Prediction:</h6>
            <h5 style={{fontSize:25,fontWeight:600}}>{NameCondition}</h5>
        </div>
      </div>
    </Card>
         </div>
  );
}

const mapStateToProps = (state) => ({
    IDCondition:state.diagnosisResult?.data[0]?.prediction[0],
    NameCondition:state.diagnosisResult?.data[0]?.prediction[1],
});

export default connect(mapStateToProps)(CardBloodType);
