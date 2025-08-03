import React, { useEffect, useState } from 'react';

import { Line } from "react-chartjs-2";
import { Card } from "antd";

import { connect } from "react-redux";


const LineChart = ({ fecha_intervalo, cardDays }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    if (fecha_intervalo && cardDays && cardDays.length > 0) {
      const datasets = cardDays.map((item, index) => ({
        label: `Dataset ${index + 1}`,
        data: Object.values(item),
        borderColor: index === 0 ? "#00723F" : "#d63384",
        borderWidth: 1,
        fill: false,
      }));

      setChartData({
        labels: fecha_intervalo,
        datasets: datasets
      });
    }
  }, [fecha_intervalo, cardDays]);

  if (!chartData) {
    return <div>Cargando datos del gráfico...</div>;
  }

  const options = {
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          autoSkip: false,
          maxRotation: 0,
          minRotation: -90,
        },
      },
      y: {
        ticks: {
          beginAtZero: true,
        },
      },
    },
  };

  return (
   
     <div className="shadow" style={{  marginRight: 15, marginTop: 35, width: "60%" }}>
     <Card title="Days">
       <div className="p-2" style={{ width: "100%", height: 500 }}>
        
           <Line options={options} data={chartData} />
         
       </div>
     </Card>
   </div>
  );
};

const mapStateToProps = state => ({
  fecha_intervalo: state.statistics.data.fecha_intervalo,
  cardDays: state.statistics.data.cardDays,
});

export default connect(mapStateToProps)(LineChart);
