import React, { useRef, useEffect, useState } from "react";
import {connect } from "react-redux";
import CardDiagnosis from "../cards/diagnosis/card"
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';

const dataNormal= [
  
    {name:"14",img : "universidad/normal_fundus/14.jpg"},
    {name:"78",img : "universidad/normal_fundus/78.jpg"},
    {name:"79",img :"universidad/normal_fundus/79.jpg"},

]
const dataMild = [
  
  {name:"190",img : "universidad/mild_diabetic_retinopathy/190.jpg"},
 
]

function Home({onSelectImage}) {
    const onChange = (key: string) => {
        console.log(key);
    };
    const items: TabsProps['items'] = [
        {
          key: '1',
          label: 'Normal Fundus',
          children:<CardDiagnosis  dataset={"Universidad Nacional de la Asuncion"} yolo={true} sam={true} onSelectImage={onSelectImage} condition={"Normal Fundus"} data={dataNormal}/>,
        },
        {
          key: '2',
          label: 'Mild non Proliferative Retinopathy',
          children: <CardDiagnosis dataset={"Universidad Nacional de la Asuncion"} yolo={true} sam={true} onSelectImage={onSelectImage} condition={"Mild Nonproliferative Retinopathy"} data={dataMild}/>,
        },
      
      ];
      


  return (
    
        <>
        

        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
         
        </>
   
  );
}

export default Home;
