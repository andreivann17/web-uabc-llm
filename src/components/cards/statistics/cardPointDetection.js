import React from "react";
import {
  Card,
  Typography,
} from "antd";
import { connect } from "react-redux";
import CountUp from "react-countup";
const { Text } = Typography;

const CardPoint = ({ cardPositive, cardNegative, cardTotal }) => {

  const data = [
    {
        point:cardNegative,
        title:"Total Negative Detections",
        color:"primary"
    },{
        point:cardPositive,
        title:"Total Positive Detections",
        color:"danger"
    },{
        point:cardTotal,
        title:"Total Detections",
        color:"success"
    }
] 
  return (
    <>
  
      <div
        className="margint-2 marginb-2"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "stretch",
        }}
      >
        {
        data.map((data, index) => (
          <div
            style={{
              width: "32%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Card
              style={{
                marginTop: 16,
                boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
                flex: 1,
              }}
              title={
                <span>
                  <i
                    className="fa-solid fa-circle marginr-1"
                    style={{ color: `var(--bs-${data.color})` }}
                  ></i>{" "}
                 {data.title}
                </span>
              }
            >
              <div className="text-center">
                <Text>
                  <CountUp
                    style={{ fontSize: 26 }}
                    start={0}
                    end={data.point}
                    duration={2.75}
                  />{" "}
                  detections
                </Text>
              </div>
            </Card>
          </div>
        ))}
   
      </div>
     
    </>
  );
};

const mapStateToProps = (state) => ({
  cardPositive: state.statistics.data.cardPositive,
  cardNegative: state.statistics.data.cardNegative,
  cardTotal: state.statistics.data.cardTotal,
});

export default connect(mapStateToProps)(CardPoint);
