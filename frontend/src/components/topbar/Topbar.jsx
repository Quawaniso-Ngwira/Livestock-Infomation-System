import React, { useEffect, useState, useContext } from "react";
import { BrowserRouter as Router, Route, Routes, Link, Navigate, } from "react-router-dom";
import { AuthContext } from "../../helpers/AuthContext";


export default function Topbar(){
  const { authState } = useContext(AuthContext);

    return(
       <>
      {!authState.status ? (
        <>   
        </>
      ) : (
        <>
    
        <div style={{backgroundColor: "#1C321C"}}>
<div className="inlineNav">
 <Link to="/">
 <div><h4>HOME</h4></div>
 </Link>
 <Link to="/kholaPage">
 <div><h4>MY KHOLA</h4></div>
 </Link>
 <Link to="/choose">
 <div><h4>MANAGE</h4></div>
 </Link>
 <Link to="/market">
 <div><h4>MARKET</h4></div>
 </Link>
 <Link to="/aboutUs">
 <div><h4>ABOUT US</h4></div>
 </Link>
</div>
</div>

        </>
      )} 
        
        </>   
    )
}
