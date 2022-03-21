import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"; 
import axios from "axios";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import "./specificKhola.css";
import VaccinationTable from '../vaccinationTable/VaccinationTable';
import FeedsTable from '../feedsTable/FeedsTable';
import KholaSideDetails from '../KholaSideDetails/KholaSideDetails';
import {  Delete, Edit } from "@material-ui/icons";


export default function SpecificKhola(props) {

  //getting the current date and assigning it to the variable of date
  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;

    // let { id } = useParams();
    const [postKhola, setKholaObject] = useState({});
    const [finalReport, setFinalReport] = useState([]);
    //userID and Khola IDs have been declared as global variables in this file
    var id = localStorage.getItem('id');
    var userlivestockNumber = localStorage.getItem('userlivestockNumber');
   
   
    let navigate = useNavigate();
 
  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate( "/home");
     
    }
  }, []);
  
//persist state after refreshing the page
// useEffect(()=> {
//   const data = localStorage.getItem('maintain-active-modal-state');
//   if(data) {
//     setOpen(JSON.parse(data));
//   }
//   },[]);

// useEffect(()=> {
//   localStorage.setItem("maintain-active-modal-state", JSON.stringify(open));
// });

 //for identifying the khola details
//  useEffect(() => {
//   var KholaId = localStorage.getItem('KholaId');
//     axios.get(`http://localhost:3001/khola/ById/${KholaId}`).then((response) => {
//       setKholaObject(response.data);
//       console.log(response.data)
//     });
//   }, []);

  //for generating reports into our application

 useEffect(() => {
  var KholaId = localStorage.getItem('KholaId');
    axios.get(`http://localhost:3001/khola/report/vaccination/${KholaId}`).then((response) => {
      setFinalReport(response.data);
      console.log(response.data)
    });
  }, []);
// //deleting the khola
//   const deleteKhola = () => {
//     var KholaId = localStorage.getItem('KholaId');
//     axios
//       .delete(`http://localhost:3001/khola/delete/${KholaId}`, {
//         headers: { accessToken: localStorage.getItem("accessToken") },
//       })
//       .then(() => {
//         navigate("/kholaPage");
//       });
//   };
 
// //updating the khola info
// const updateKhola = () => {
//       navigate("/upDateKhola");
// };


 return(
   <div style={{ width: "100%", height: "100%"}}>
     <br/>
          <KholaSideDetails/>
      <br/>        
          <VaccinationTable/>
        
    {/* <ListBreedsTable/> */}
   </div>
 );
   
 
}
