import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"; 
import axios from "axios";
import RenderKholas from "../RenderKholas/RenderKholas";
import './kholaPage.css'

export default function KholaPage() {

 return(
    <div>
<div className="kholas">
                     <RenderKholas/>
             </div> 
   </div>
 );
   
 
}
