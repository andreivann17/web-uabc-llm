// Componente de la gráfica
import { useRef, useState } from "react";
import { Card, Typography, Select ,Button} from "antd";
import {
  Chart as ChartJS,
  CategoryScale,
  RadialLinearScale,
  LinearScale,
  LineElement,
  BarElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  elements,
} from "chart.js";
import { Bar, getElementAtEvent, Doughnut, Line } from "react-chartjs-2";

import { connect } from "react-redux";
import ChartWeek from "../../charts/ChartWeek";
import ChartMonth from "../../charts/ChartMonth";
import ModalExpandMonth from "../../modals/statistics/modalExpand";
import ModalExpandWeek from "../../modals/statistics/modalExpand";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  RadialLinearScale,
  Legend,
  LineElement,
  PointElement
);


//import './assets/css/bootstrap.css';
function ChartPatient({ chartMonth, chartWeek }) {
  const [modalMonth, setModalMonth] = useState(false);
  const [modalWeek, setModalWeek] = useState(false);

  const expandOnClickWeek = ()=>{
    setModalWeek(true)
  }
  const expandOnClickMonth = ()=>{
    setModalMonth(true)
  }
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "stretch",
      }}
    >
     
          <ModalExpandMonth title={"Month"} Chart={ChartMonth} isModalOpen={modalMonth} setIsModalOpen={setModalMonth}/>
           <ModalExpandWeek title={"Week"} Chart={ChartWeek} isModalOpen={modalWeek} setIsModalOpen={setModalWeek}/>
            {chartWeek && chartWeek.title && (
                <div className="shadow" style={{ width: "49%" }}>
                  <Card
                    title={
                      <div className="d-flex justify-content-between">
                        <div>{chartWeek.title}</div>
                        <div>
        <Button onClick={() => expandOnClickWeek()}><i className="fas fa-expand"></i></Button>
      </div>
                      </div>
                    }
                  >
                    <div className="p-2" style={{ width: "100%", height: 500 }}>
                      <ChartWeek />
                    </div>
                  </Card>
                </div>
              )}
              {chartMonth && chartMonth.title && (
                <div className="shadow" style={{ width: "49%" }}>
                  <Card   title={
              <div className="d-flex justify-content-between">
                        <div>{chartMonth.title}</div>
                        <div>
        <Button onClick={() => expandOnClickMonth()}><i className="fas fa-expand"></i></Button>
      </div>
                      </div>
                    }>
                    <div className="p-2" style={{ width: "100%", height: 500 }}>
                      <ChartMonth />
                    </div>
                  </Card>
                </div>
              )}
     
    </div>
  );
}

const mapStateToProps = (state) => ({
  chartMonth: state.statistics.data.chartMonth,
  chartWeek: state.statistics.data.chartWeek,
});

export default connect(mapStateToProps)(ChartPatient);
