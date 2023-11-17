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
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
//import './assets/css/bootstrap.css';
function ChartMonth({ chartMonth }) {
  console.log(chartMonth)
  const chartRef = useRef();
 

  return (
    <>
   {
    (chartMonth )&&
    <Bar
    ref={chartRef}
    options={options}
    data={{
      labels:  months,
      datasets: [
        {
          label: "# of Detections",
          data: chartMonth.totalData, // Aquí van los datos de la gráfica
          backgroundColor: ["#00723F"],
          borderColor: ["#005f34"],
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

});

export default connect(mapStateToProps)(ChartMonth);
