// Componente de la gráfica
import { useRef, useState } from "react";
import { Card, Typography, Select, Button } from "antd";
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
  ArcElement, // Importar ArcElement
} from "chart.js";
import { Bar, getElementAtEvent, Doughnut, Line } from "react-chartjs-2";

import { connect } from "react-redux";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  RadialLinearScale,
  Legend,
  LineElement,
  PointElement,
  ArcElement
);

const options = {
  maintainAspectRatio: false,
  scales: {
    xAxes: [
      {
        ticks: {
          autoSkip: false,
          maxRotation: 0,
          minRotation: -90,
        },
      },
    ],
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

//import './assets/css/bootstrap.css';
function ChartGender({ cardGender }) {
  
  const chartRef = useRef();
 

  return (
    <>
   {
    (cardGender && cardGender.title)&&
    
        <Doughnut
          ref={chartRef}
          options={options}
          data={{
            labels: cardGender.nameData ,
            datasets: [
              {
                label: "# of Detections",
                data: cardGender.totalData, // Aquí van los datos de la gráfica
                backgroundColor: ["#00723F","#1899d4","#6610f2","#fd7e14","#dc3545","#0dcaf0","#d63384","#ffc107"],
                borderColor: ["#005f34","#1394cf","#5f0be6","#eb710d","#bb2d3b","#31d2f2","#cc2b7b","#e9b007"],
                borderWidth: 1,
              },
            ],
          }}
          
        />
      
   }
    
    </>
  );
}

const mapStateToProps = (state) => ({
  chartMonth:state.statistics.data.chartMonth,
  cardGender:state.statistics.data.cardGender
});

export default connect(mapStateToProps)(ChartGender);
