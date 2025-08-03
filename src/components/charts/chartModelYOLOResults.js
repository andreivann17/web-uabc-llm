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
function ChartBloodType({ allPointsBiomarkers,allNamesBiomarkers }) {
  console.log(allNamesBiomarkers)
  const chartRef = useRef();
 

  return (
    <>
   {
    (allNamesBiomarkers )&&
    <Bar
    ref={chartRef}
    options={options}
    data={{
      labels:  allNamesBiomarkers,
      datasets: [
        {
          label: "Biomarkers",
          data: allPointsBiomarkers, // Aquí van los datos de la gráfica
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

  allPointsBiomarkers:[1,1,2,9,20,1] ,
  allNamesBiomarkers:["Optic Disc","Fovea","Microaneurism","Haemorrhages","Hard Exudates","Soft Exudates"],
});

export default connect(mapStateToProps)(ChartBloodType);
