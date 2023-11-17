import React from "react";
import { Button } from "antd";
import logo from "../../assets/img/logo.png";
import profile1 from "../../assets/img/andre.jpg";
import profile2 from "../../assets/img/andre.jpg";
import profile3 from "../../assets/img/andre.jpg";
import '../../assets/css/profiles.css';

function Home() {
  
  return (
    <div className="home-container">
      <img src={logo} alt="Logo" className="logo"/>
      <h1 className="title text-white">¿Quién está en línea?</h1>
      <div className="profiles-container margint-1 marginb-4">
       <div >
       <Button className="profile-button">
          <img src={profile1} alt="Profile 1" className="profile-image"/>
        </Button>
        <div className="d-flex justify-content-center">
        <h5 className="text-white">Andre herrera</h5>
        </div>

       </div>
       <div >
       <Button className="profile-button" >
          <img src={profile1} alt="Profile 1" className="profile-image"/>
        </Button>
        <div className="d-flex justify-content-center">
        <h5 className="text-white">Daniel herrera</h5>
        </div>

       </div>
       <div >
       <Button className="profile-button">
          <img src={profile1} alt="Profile 1" className="profile-image"/>
        </Button>
        <div className="d-flex justify-content-center">
        <h5 className="text-white">Admin</h5>
        </div>

       </div>
      </div>
     <div className="margint-2">
     <Button className="">
         Manage profiles
        </Button>
     </div>
    </div>
  );
}

export default Home;
