import React, { useContext } from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { makeStyles } from '@material-ui/core/styles';
import {  Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import {  TextField, IconButton } from '@material-ui/core';
import { SearchOutlined, Add, Delete } from '@material-ui/icons';
import Button from '@material-ui/core/Button';
import {  ArrowBackIos, ArrowBack } from "@material-ui/icons";
import './activites.css';


const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  }, root: {
    flexGrow: 1,
    textAlign: 'right',
  },
  paper: {
    padding: theme.spacing(1),
    // textAlign: 'right',
    color: theme.palette.text.primary,
  },
}));

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  height: '400px',
  color: theme.palette.text.secondary,
}));


function Activites() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [searchTitle, setSearchTitle] = useState("");
  const [makolaById, setMakolaById] = useState([]);
  

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    } else {
     console.log("")
    }
  }, []);
  
  const back = () => {
    navigate("/specificKhola");
};
///schedules/bykhola/:kholaId
    
    useEffect(() => { 
        var id = localStorage.getItem('KholaId');
        console.log(id);
          axios.get(`https://serveriweta.herokuapp.com/schedules/bykhola/${id}`).then((response) => {
              console.log(response.data);
              setMakolaById(response.data);
              
          });
      }, []);

      //deleting the khola
const deleteActivity = () => {
    var KholaId = localStorage.getItem('KholaId');
    axios
      .delete(`https://serveriweta.herokuapp.com/khola/delete/${KholaId}`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then(() => {
        navigate("/activites");
      });
    };
    


  
  return (
    <div className="home"> 
         <p onClick={back} className="backArrow"><ArrowBack/>Back</p> 
           <br/>
          <div style={{display: "flex"}}>
           <TextField style={{ backgroundColor: "#fafafa"}}
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
              
        <div className={classes.root}>
          <Link to="/createActivity">  
          <Button variant="outlined" color="primary" startIcon={<Add/>}>
       Create Schedules
      </Button> 
      </Link> 
    </div>
    </div> 
              <hr/>
              <h2 style={{textAlign: "center"}}> Schedules</h2>
    
<div className="cards-container">  

{makolaById.filter((value) => {
            if (searchTitle === "") {
              return value;
            } else if (
              value.Activity?.toLowerCase().includes(searchTitle.toLowerCase())
            ) {
              return value;
            }
          }).map((value, key) => {
  return (

       <div key={key} className="cards">
            <div className="" >
            <div className="breeedcategory">
              <div className="arrange"><div className="split__">
             <h2 className="breedname"> 
             {value.Activity} </h2>
             <p className="breedname"> Due on: {value.Day} </p>
             <p className="breedname"> <Delete onClick={deleteActivity}/> </p>
              </div>
              </div> </div>
           </div>
           </div>
            
        
        );
      })}


</div>


     </div>
   
 
    
  );
}

export default Activites;