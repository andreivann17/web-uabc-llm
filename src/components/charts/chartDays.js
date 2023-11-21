import React from "react";
import { Line } from "react-chartjs-2";
import { Card } from "antd";

import { connect } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
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
/*
[
      {
        label: "Dataset 1", // name of the first line
        data: [65, 59, 80, 81, 56, 55, 40], // data for the first line
        borderColor: "#00723F",
        borderWidth: 1,
        fill: false,
      },
      {
        label: "Dataset 2", // name of the second line
        data: [28, 48, 40, 19, 86, 27, 90], // data for the second line
        borderColor: "#d63384",
        borderWidth: 1,
        fill: false,
      },
    ]
*/
function LineChart(fecha_intervalo,cardDays) {
  console.log(cardDays)
  console.log(cardDays[0])
  const [result,setResult] = useState({})
  useEffect(() => {
    setResult(
      
      {
      labels: fecha_intervalo, // X-axis labels
      datasets: [
        {
          label: "Dataset 1", // name of the first line
          data: cardDays[0].values, // data for the first line
          borderColor: "#00723F",
          borderWidth: 1,
          fill: false,
        },
        {
          label: "Dataset 2", // name of the second line
          data: cardDays[1].values, // data for the second line
          borderColor: "#d63384",
          borderWidth: 1,
          fill: false,
        },
      ],
    }
    )
  }, [cardDays]);
  
  return (
    <div className="shadow" style={{  marginRight: 15, marginTop: 35, width: "60%" }}>
      <Card title="Days">
        <div className="p-2" style={{ width: "100%", height: 500 }}>
          <Line options={options} data={result} />
        </div>
      </Card>
    </div>
  );
}

const mapStateToProps = (state) => ({
  fecha_intervalo:state.statistics.data.fecha_intervalo,
  cardDays:state.statistics.data.cardDays
});

export default connect(mapStateToProps)(LineChart);
