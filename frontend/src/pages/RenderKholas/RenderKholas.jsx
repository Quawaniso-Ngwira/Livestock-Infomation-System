import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router"; 
import { Link } from "react-router-dom"; 
import axios from "axios";
import {  TextField, IconButton } from '@material-ui/core';
import { SearchOutlined } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import './renderKhola.css';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));


export default function RenderKholas(props) {
  const navigate = useNavigate();
  const [makolaById, setMakolaById] = useState([]);
   const listOfKholaNumber = makolaById.length
   localStorage.setItem("listOfKholaNumber", listOfKholaNumber);
  const [searchTitle, setSearchTitle] = useState("");


  const classes = useStyles();


  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    } else {
     console.log("")
    }
  }, []);

  ///khola/ByUserId/
  useEffect(() => { 
  var id = localStorage.getItem('id');
    axios.get(`http://localhost:3001/khola/ByUserId/${id}`).then((response) => {
        console.log(response.data);
       setMakolaById(response.data);
        
    });
}, []);


 return(
   <div>
     
    <div className="searchKholabar">
<div>
  
  <TextField style={{margin: "10px", backgroundColor: "#fafafa"}}
                onChange={(e) => setSearchTitle(e.target.value)}
                id="standard-bare"
                variant="outlined"
                placeholder="(Search Khola)"
                InputProps={{
                  endAdornment: (
                    <IconButton>
                      <SearchOutlined />
                    </IconButton>
                  ),
                }}
              />
              </div>
      
  
      <h3 style={{paddingLeft: "1135px"}}> Available Kholas:{listOfKholaNumber}  </h3>
      </div>
      <br/>

     {makolaById.filter((value) => {
            if (searchTitle === "") {
              return value;
            } else if (
              value.KholaName?.toLowerCase().includes(searchTitle.toLowerCase())
            ) {
              return value;
            }
          }).map((value, key) => {
  return (

       <div key={key} className="renderbreed">
            <div className="title" >
            
            <div className="breeedcategory"
              onClick={() => {
                
                navigate("/SpecificKhola");
                localStorage.setItem("KholaId", JSON.stringify(value.id))
               }}
            >
              <div className="arrange"><div className="split">
             <h3 className="breedname">{value.KholaName} Khola </h3>
              </div>
              </div> </div>
           </div>
           </div>
            
        
        );
      })}

   </div>
 )
   

}
