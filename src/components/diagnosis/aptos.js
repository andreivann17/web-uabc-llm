import React, { useRef, useEffect, useState } from "react";
import {connect } from "react-redux";
import CardDiagnosis from "../cards/diagnosis/card"
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';

const dataNormal= [
  
    {name:"00cc2b75cddd",img : "aptos/normal_fundus/00cc2b75cddd.png"},
    {name:"01f7bb8be950",img : "aptos/normal_fundus/01f7bb8be950.png"},
    {name:"0125fbd2e791",img :"aptos/normal_fundus/0125fbd2e791.png"},
    {name:"0232dfea7547",img : "aptos/normal_fundus/00cc2b75cddd.png"},
]
const dataModerate = [
  
    {name:"012a242ac6ff",img : "aptos/moderate/012a242ac6ff.png"},
   
]
function Home({onSelectImage}) {
    const onChange = (key: string) => {
        console.log(key);
    };
    const items: TabsProps['items'] = [
        {
          key: '1',
          label: 'Normal Fundus',
          children:<CardDiagnosis dataset={"Aptos"} onSelectImage={onSelectImage} condition={"Normal Fundus"}  data={dataNormal}/>,
        },
        {
          key: '2',
          label: 'Moderate non Proliferative Retinopathy',
          children: <CardDiagnosis dataset={"Aptos"} yolo={true} sam={true} onSelectImage={onSelectImage} condition={"Moderate Non Proliferative Retinopathy"} data={dataModerate}/>,
        },
      
      ];
      


  return (
    
        <>
        

        <Tabs className="w-100" defaultActiveKey="1" items={items} onChange={onChange} />
         
        </>
   
  );
}

export default Home;
