import React, { useState } from "react";
import Header from "../../components/navigation/header.jsx";
import Contenido from "../../components/navigation/content.jsx";
import { useEffect } from "react";
import { useDispatch, connect } from "react-redux";
import HistoryTable from "../../components/tables/historyTable.js"

const token = localStorage.getItem("tokends");
function Home({}) {


  useEffect(() => {
    // dispatch(actionDivisas())
  }, []);
  return (
    <>
      {token != null && (
        <>
         

          <Header title={"History"} icon={"fas fa-history marginr-1 "} />
          <Contenido title={"History"} icon={"fas fa-history marginr-1 "} />
          <div className="Panel_Contenido  marginb-5">
           
            <div className="mt-3">
                <HistoryTable/>
            </div>
          </div>
        </>
      )}
    </>
  );
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps)(Home);
