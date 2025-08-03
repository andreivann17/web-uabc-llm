import React, { useRef, useEffect, useState } from "react";
import {connect } from "react-redux";
import CardDiagnosis from "../cards/diagnosis/card"
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';

const dataGlaucoma= [
  
    {name:"EyePACS-Glaucoma-1",img : "eyepacs/glaucoma/EyePACS-Glaucoma-1.jpg"},
    {name:"EyePACS-Glaucoma-10",img : "eyepacs/glaucoma/EyePACS-Glaucoma-10.jpg"},
    {name:"EyePACS-Glaucoma-11",img :"eyepacs/glaucoma/EyePACS-Glaucoma-11.jpg"},
    {name:"EyePACS-Glaucoma-100",img :"eyepacs/glaucoma/EyePACS-Glaucoma-100.jpg"},
    {name:"EyePACS-Glaucoma-103",img :"eyepacs/glaucoma/EyePACS-Glaucoma-103.jpg"},
    {name:"EyePACS-Glaucoma-105",img :"eyepacs/glaucoma/EyePACS-Glaucoma-105.jpg"},

]


function Home({onSelectImage}) {
    const onChange = (key: string) => {
        console.log(key);
    };
    const items: TabsProps['items'] = [
        {
          key: '1',
          label: 'Glaucoma',
          children:<CardDiagnosis dataset={"Eyepacs"} onSelectImage={onSelectImage} condition={"Glaucoma"} data={dataGlaucoma}/>,
        },
      
      
      ];
      


  return (
    
        <>
        

        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
         
        </>
   
  );
}

export default Home;
