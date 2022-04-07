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
import { SearchOutlined, Add } from '@material-ui/icons';
import Button from '@material-ui/core/Button';
import {  ArrowBackIos, ArrowBack } from "@material-ui/icons";
import './dairyRecordings.css';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//     textAlign: 'right',
//   },
//   paper: {
//     padding: theme.spacing(1),
//     // textAlign: 'right',
//     color: theme.palette.text.primary,
//   },
// }));

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


function DairyRecordings() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [makolaById, setMakolaById] = useState([]);
   const listOfKholaNumber = makolaById.length
   localStorage.setItem("listOfKholaNumber", listOfKholaNumber);
  const [searchTitle, setSearchTitle] = useState("");
  

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
          <Link to="/createRecord">  
          <Button variant="outlined" color="primary" startIcon={<Add/>}>
       Create Record
      </Button> 
      </Link> 
    </div>
    </div> 
              <hr/>
              <h2 style={{textAlign: "center"}}> Recordings</h2>
    
<div className="cards-container">  

</div>


     </div>
   
 
    
  );
}

export default DairyRecordings;