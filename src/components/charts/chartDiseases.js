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
const diseases =  ['branch retinal vein occlusion', 'cataract',
'central retinal vein occlusion', 'chorioretinal atrophy',
'diabetic retinopathy', 'drusen',
'dry age-related macular degeneration', 'epiretinal membrane',
'epiretinal membrane over the macula', 'glaucoma',
'hypertensive retinopathy', 'laser spot', 'lens dust',
'macular epiretinal membrane', 'maculopathy',
'mild nonproliferative retinopathy',
'moderate non proliferative retinopathy', 'myelinated nerve fibers',
'myopia retinopathy', 'normal fundus', 'optic disc edema',
'pathological myopia', 'peripapillary atrophy',
'post laser photocoagulation', 'post retinal laser surgery',
'proliferative diabetic retinopathy', 'refractive media opacity',
'retinal pigmentation', 'retinitis pigmentosa',
'severe nonproliferative retinopathy',
'severe proliferative diabetic retinopathy',
'spotted membranous change', 'suspected glaucoma', 'tessellated fundus',
'vitreous degeneration', 'wet age-related macular degeneration',
'white vessel']

//import './assets/css/bootstrap.css';
function ChartDisease({ dataDiseases }) {
  console.log(dataDiseases)
  const chartRef = useRef();
 

  return (
    <>
   {
    (dataDiseases )&&
    
    <Bar
    ref={chartRef}
    options={options}
    style={{"height":600}}
    data={{
      labels: diseases ,
      
      datasets: [
        {
          label: "# of Predictions",
          data: dataDiseases, // Aquí van los datos de la gráfica
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
  dataDiseases:state.statistics.data.diseases,

});

export default connect(mapStateToProps)(ChartDisease);
