import React, { useRef, useEffect, useState } from "react";
import {connect } from "react-redux";
import CardDiagnosis from "../cards/diagnosis/card"
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';

const dataMyopia= [
  
    {name:"IMG0005",img : "hpmi/IMG0005.jpg"},
    {name:"IMG0008",img : "hpmi/IMG0008.jpg"},
    {name:"IMG0019",img :"hpmi/IMG0019.jpg"},
    {name:"IMG0073",img :"hpmi/IMG0073.jpg"},
    {name:"IMG0115",img :"hpmi/IMG0115.jpg"},


]


function Home({onSelectImage}) {
    const onChange = (key: string) => {
        console.log(key);
    };
    const items: TabsProps['items'] = [
        {
          key: '1',
          label: 'Pathological Myopia',
          children:<CardDiagnosis dataset={"HPMI"} onSelectImage={onSelectImage} condition={"Pathological Myopia"} data={dataMyopia}/>,
        },
      
      
      ];
      


  return (
    
        <>
        

        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
         
        </>
   
  );
}

export default Home;
