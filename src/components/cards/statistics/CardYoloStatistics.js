import { useState } from "react";
import ChartModelYOLOResults from "../../charts/chartModelYOLOResults";
import ModalExpand from "../../modals/statistics/modalExpand"
import {  Card, Typography, List, Button  } from "antd";
import {connect} from "react-redux"
function CardBloodType({ loading }) {
  const data = [
    {
      title: 'Optic Disc',
      color: "(0, 0, 255)",
      cantidad:1
    },
    {
      title: 'Fovea',
      color: "(0, 255, 0)",
      cantidad: 1
    },
    {
      title: 'Microaneurism',
      color: "(255, 0, 0)",
      cantidad: 3
    },
    {
      title: 'Haemorrhages',
      color: "(0, 255, 255)",
      cantidad: 9
    },
    {
      title: 'Hard Exudates',
      color: "(255, 0, 255)",
      cantidad: 20
    },
    {
      title: 'Soft Exudates',
      color: "(255, 255, 0)",
      cantidad: 1
    },
  ];
    const [isModalOpen,setIsModalOpen] = useState(false)

    const expandOnClick = () =>{
     setIsModalOpen(true)
    }


  return (
    <div className="shadow " style={{ marginLeft:15}}>
        <ModalExpand Chart={ChartModelYOLOResults} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} title={"Predictions from 37 Classes Model"}/>
    

        <Card
      loading={loading}
      className="custom-modal-body"
      title={
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>Results from YOLO Model</div>
        <div>
  
          <Button onClick={expandOnClick}  icon={<i className="fas fa-expand" />} />
        </div>
        </div>
      }
      style={{ width: "100%",height:"100%" }} // Adjust width as necessary
      bodyStyle={{display:"flex",alignItems:"end",height:"90%",padding:"0"}}
    >
      <div className="p-2 border-bottom w-100" style={{height:450,marginBottom:0 }}>
        {/* Assuming  <ChartModelYOLOResults /> is a defined component */}
        <ChartModelYOLOResults />
      </div>
      
    </Card>
         </div>
  );
}

const mapStateToProps = (state) => ({

});

export default connect(mapStateToProps)(CardBloodType);
