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
function ChartBloodType({ allPointsConditions,allNamesConditions }) {
  console.log(allNamesConditions)
  const chartRef = useRef();
 

  return (
    <>
   {
    (allNamesConditions )&&
    <Bar
    ref={chartRef}
    options={options}
    data={{
      labels:  allNamesConditions,
      datasets: [
        {
          label: "Class Prediction Probabilities",
          data: allPointsConditions, // Aquí van los datos de la gráfica
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

  allPointsConditions:state.diagnosisResult?.data[0]?.prediction[2] ,
  allNamesConditions:state.diagnosisResult?.data[0]?.prediction[3],
});

export default connect(mapStateToProps)(ChartBloodType);
