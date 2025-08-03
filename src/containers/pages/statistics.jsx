import React, { useState } from "react";
import Header from "../../components/navigation/header.jsx";
import Contenido from "../../components/navigation/content.jsx";
import backgroundImage from "../../assets/img/backgroundStatistics.jpg";
import CardPoint from "../../components/cards/statistics/cardPointDetection.js"
import { useEffect } from "react";
import {  Card, Typography, Select, Button  } from "antd";
import { useDispatch, connect } from "react-redux";
import { actionStatisticsGet} from "../../redux/actions/statistics/statistics.js";
import SelectDates from "../../components/utils/selectDates.js"
import DetectionChart from "../../components/cards/statistics/CardPatient.js";
import CardGender from "../../components/cards/statistics/CardGender.js";
import CardMap from "../../components/cards/statistics/CardMap.js";
import DiaseaseChart from "../../components/charts/chartDiseases.js"
import CompareChart from "../../components/charts/chartCompare.js"
import CardBloodType from "../../components/cards/statistics/CardBloodType.js";
import { useNavigate } from "react-router-dom";

function Home({cardBloodType}) {
  const [token,setToken]  = useState(localStorage.getItem("tokends"))
  const navegate = useNavigate();
  const expandOnClickDiseases = () =>{
    
  }
  useEffect(() => {
    //dispatch(actionStatisticsGet())
  }, []);
  useEffect(() => {
    console.log(token)
    if (token == null) {
      navegate("/login");
    }
  }, [token]);
  return (
    <>
      {token != null && (
        <>

          <Header title={"Statistics"} icon={"fas fa-chart-line marginr-1 "} />
          <Contenido backgroundImage={backgroundImage} title={"Statistics"} icon={"fas fa-chart-line marginr-1 "} />
          <div className="Panel_Contenido  marginb-5">
       
            <div className="mt-3">
              <SelectDates action={actionStatisticsGet}/>
              <CardPoint />
              <DetectionChart />
          <div 
           style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "stretch",
          }}
          >
                 
          <CardGender />

          <CardBloodType />
 
          <CardMap/>
          </div>
          <div 
           style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "stretch",
          }}
          >
             <div className="shadow margint-3" style={{ width: "100%" }}>
                  <Card
                    title={
                      <div className="d-flex justify-content-between">
                        <div>Diseases Detections</div>
                        <div>
        <Button onClick={() => expandOnClickDiseases()}><i className="fas fa-expand"></i></Button>
      </div>
                      </div>
                    }
                  >
                        <DiaseaseChart />
                  </Card>
                </div>    
     
          
          </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

const mapStateToProps = (state) => ({
  cardBloodType:state.statistics.data.cardBloodType
});

export default connect(mapStateToProps)(Home);
