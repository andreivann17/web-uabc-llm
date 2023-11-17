
import { Card, Typography, Button } from "antd"; 
import {connect } from "react-redux";
import CountUp from "react-countup";
import { useNavigate } from "react-router-dom";
const { Text } = Typography; 

const CardDetections = ({ cardNegativeAll,cardToday,setIsModalMalignusOpen }) => {
  const navigate = useNavigate();
  const detailsMalignus = () =>{
    setIsModalMalignusOpen(true)
  }
  return (
    <>
      <div
        style={{
          width: "24%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Card
          style={{
            marginTop: 16,
            boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
            flex: 1,
            display: "flex",
            flexDirection: "column",
          }}
          title="Detections Done Today"
          bodyStyle={{ flex: 1 }}
        >
          <div className="d-flex justify-content-center align-items-center h-100 marginb-4">
            <Text>
              <CountUp
                style={{ fontSize: 32 }}
                start={0}
                end={cardToday}
                duration={2.75}
              />{" "}
              detections
            </Text>
          </div>
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100%",
            }}
          >
            <Button
              onClick={() => navigate("/records")}
              className="card-footer-button"
              type="primary"
              style={{
                backgroundColor: "#00723F",
                color: "white",
                width: "100%",
                borderRadius: 0,
              }}
            >
              Go to Records
            </Button>
          </div>
        </Card>
      </div>

      <div
        style={{
          width: "24%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Card
          style={{
            marginTop: 16,
            boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
            flex: 1,
            display: "flex",
            flexDirection: "column",
          }}
          title="Detected Malignant Results"
          bodyStyle={{ flex: 1 }}
        >
          <div className="d-flex justify-content-center align-items-center h-100 marginb-4">
            <Text>
              <CountUp
                style={{ fontSize: 32 }}
                start={0}
                end={cardNegativeAll}
                duration={2.75}
              />{" "}
              records
            </Text>
          </div>
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100%",
            }}
          >
            <Button
              className="card-footer-button"
              type="default"
              style={{ width: "100%", color: "red", borderRadius: 0 }}
              onClick={() => detailsMalignus()}
            >
              View Records
            </Button>
          </div>
        </Card>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  cardToday: state.patients.dashboard.cardToday,
  cardNegativeAll: state.patients.dashboard.cardNegativeAll,

});

export default connect(mapStateToProps)(CardDetections);
