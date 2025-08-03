import React, { useRef, useEffect, useState } from "react";
import {connect } from "react-redux";
import CardDiagnosis from "../cards/diagnosis/card"
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';

const dataModerate= [
  
  {name:"407",img : "idrid/moderate_diabetic_retinopathy/IDRiD_407.jpg"},

]
const dataSevere = [
  
  {name:"002",img : "idrid/severe_diabetic_retinopathy/IDRiD_002.jpg"},
  {name:"004",img : "idrid/severe_diabetic_retinopathy/IDRiD_004.jpg"},
  {name:"011",img : "idrid/severe_diabetic_retinopathy/IDRiD_011.jpg"},
  {name:"035",img : "idrid/severe_diabetic_retinopathy/IDRiD_035.jpg"},
  {name:"077",img : "idrid/severe_diabetic_retinopathy/IDRiD_077.jpg"},
]

function Home({onSelectImage}) {
    const onChange = (key: string) => {
        console.log(key);
    };
    const items: TabsProps['items'] = [
        {
          key: '1',
          label: 'Moderate nonProliferative Retinopathy',
          children:<CardDiagnosis  dataset={"IDRID"} yolo={true} sam={true} onSelectImage={onSelectImage} condition={"Moderate Nonproliferative Retinopathy"} data={dataModerate}/>,
        },
        {
          key: '2',
          label: 'Severe nonProliferative Retinopathy',
          children: <CardDiagnosis dataset={"IDRID"} yolo={true} sam={true} onSelectImage={onSelectImage} condition={"Severe Nonproliferative Retinopathy"} data={dataSevere}/>,
        },
      
      ];
      


  return (
    
        <>
        

        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
         
        </>
   
  );
}

export default Home;
