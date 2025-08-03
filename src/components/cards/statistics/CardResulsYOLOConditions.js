import { useState } from "react";
import ChartModelResults from "../../charts/chartModelResults";
import ModalExpand from "../../modals/statistics/modalExpand"
import ModalInfo from "../../modals/clasification/modalinfo"
import ModalTable from "../../modals/clasification/modaltable"
import {  Card, Typography, Select, List,Image  } from "antd";
import {connect} from "react-redux"
function CardBloodType({loading,pathyolo }) {
  const data = [
    {
      title: 'Op. Disc',
      color: "(0, 0, 255)",
      cantidad:1
    },
    {
      title: 'Fovea',
      color: "(0, 255, 0)",
      cantidad: 1
    },
    {
      title: 'MA.',
      color: "(255, 0, 0)",
      cantidad: 3
    },
    {
      title: 'Hemo.',
      color: "(0, 255, 255)",
      cantidad: 9
    },
    {
      title: 'H. Exudates',
      color: "(255, 0, 255)",
      cantidad: 20
    },
    {
      title: 'S. Exudates',
      color: "(255, 255, 0)",
      cantidad: 1
    },
  ];
  console.log(pathyolo)
    const [isModalOpen,setIsModalOpen] = useState(false)
  
    const expandOnClick = () =>{
     setIsModalOpen(true)
    }
 // Asume que pathyolo ya es una cadena base64 de la imagen
 const imageSrc = `data:image/jpeg;base64,${pathyolo}`;

 return (
   <div className="shadow" style={{ marginLeft: 15, }}>
     <ModalExpand Chart={ChartModelResults} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} title={"Predictions from 37 Classes Model"} />
     <Card
  loading={loading}
  title={
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <>Object Detections from YOLO Model</>
    </div>
  }
  
  style={{ width: "100%", marginBottom: 0 }} // Adjust width and remove bottom margin
  bodyStyle={{ padding: "0px",paddingTop:0,margin:0}} // Remove padding to eliminate white space
>
<div className="d-flex justify-content-center align-items-end " style={{ marginBottom: 0,alignItems:"end" }}>
      {(loading ? "" : imageSrc) && (
        <Image
          width={"100%"}
          style={{marginBottom:0}}
          alt=""
          src={loading ? "" : imageSrc}  // Utiliza imageSrc que incluye el prefijo necesario para base64
        />
      )}
    </div>
    <div>
    <div className="p-2 border-bottom w-100" style={{marginBottom:0 }}>
        {/* Assuming  <ChartModelYOLOResults /> is a defined component */}
        {!loading && data && data.map((item, index) => (
       <div className=" m-2 " style={{display:"inline-block"}}>
        <div
         className="d-flex margint-1"
        >
          <div className="marginr-1" style={{width:20,height:20,background:"rgb"+item.color}}></div>
          <h6 >{item.title} ({item.cantidad})</h6>
            </div>
      </div>
    ))}

      </div>
    </div>
  </Card>
   </div>
 );
}

const mapStateToProps = (state) => ({
 pathyolo: state.diagnosisResult?.data[0]?.yolo,
});

export default connect(mapStateToProps)(CardBloodType);
