import React, { useRef, useEffect, useState } from "react";
import {connect } from "react-redux";
import CardDiagnosis from "../../components/cards/diagnosis/card"
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
const dataCataract = [
    {name:"0_left",img : "odir/cataract/0_left.jpg"},
    {name:"24_right",img : "odir/cataract/24_right.jpg"},
    {name:"112_right",img : "odir/cataract/112_right.jpg"},
    {name:"188_right",img : "odir/cataract/188_right.jpg"},
    {name:"354_right",img : "odir/cataract/354_right.jpg"},
    {name:"477_right",img : "odir/cataract/477_right.jpg"},
]
const dataDrusen = [
  
    {name:"135_right",img : "odir/drusen/135_right.jpg"},
    {name:"142_right",img : "odir/drusen/142_right.jpg"},
    {name:"181_right",img : "odir/drusen/181_right.jpg"},
]
const dataDry = [
  
    {name:"48_right",img : "odir/dry/48_right.jpg"},
    {name:"53_right",img : "odir/dry/53_right.jpg"},
    {name:"162_right",img : "odir/dry/162_right.jpg"},
    {name:"164_right",img : "odir/dry/164_right.jpg"},
]
const dataGlaucoma = [
  
    {name:"1209_right",img : "odir/glaucoma/1209_right.jpg"},
    {name:"1214_right",img : "odir/glaucoma/1214_right.jpg"},
    {name:"1216_right",img : "odir/glaucoma/1216_right.jpg"},
    {name:"1217_right",img : "odir/glaucoma/1217_right.jpg"},
]
const dataMyopia = [
  
    {name:"39_left",img : "odir/myopia/39_left.jpg"},
    {name:"145_left",img : "odir/myopia/145_left.jpg"},
    {name:"382_right",img : "odir/myopia/382_right.jpg"},
    {name:"504_left",img : "odir/myopia/504_left.jpg"},
]
function Home({onSelectImage}) {
    const onChange = (key: string) => {
        console.log(key);
    };
    const items: TabsProps['items'] = [
        {
          key: '1',
          label: 'Cataract',
          children:<CardDiagnosis dataset={"ODIR-5K"}  onSelectImage={onSelectImage} condition={"Cataract"} data={dataCataract}/>,
        },
        {
          key: '2',
          label: 'Drusen',
          children: <CardDiagnosis dataset={"ODIR-5K"} onSelectImage={onSelectImage} condition={"Drusen"} data={dataDrusen}/>,
        },
        {
          key: '3',
          label: 'Dry Age-Related Macular Degeneration',
          children: <CardDiagnosis dataset={"ODIR-5K"} onSelectImage={onSelectImage} condition={"Dry Age-Related Macular Degeneration"} data={dataDry}/>,
        },
        {
            key: '4',
            label: 'Glaucoma',
            children: <CardDiagnosis dataset={"ODIR-5K"} onSelectImage={onSelectImage} condition={"Glaucoma"} data={dataGlaucoma}/>,
          },
          {
            key: '5',
            label: 'Pathological Myopia',
            children: <CardDiagnosis dataset={"ODIR-5K"} onSelectImage={onSelectImage} condition={"Pathological Myopia"} data={dataMyopia}/>,
          },
      ];
      


  return (
    
        <>
        

        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
         
        </>
   
  );
}

export default Home;
