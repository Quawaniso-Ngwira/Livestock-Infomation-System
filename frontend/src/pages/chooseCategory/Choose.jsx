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
import './choose.css';

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

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  height: '400px',
  color: theme.palette.text.secondary,
}));


function Choose() {

  // initialising classes to the methodof UseStyles() method
  const classes = useStyles();
  
  let navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    } else {
     console.log("")
    }
  }, []);

  return (
    <div className="home">
     
      <div className="homeWidgets">
          <div className="featured">
          <Box sx={{ width: '100%' }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
          {/* link to sidebar updated by id*/}
          <Link to="/nutrition">
          <Item className={classes.root}> 
          
             <h2 style={{color:"blue", marginTop:"20%"}}> Cattle</h2>    
          </Item>
          </Link>
        </Grid>
        <Grid item xs={6}>
          {/* link to pig sidebar linking by id */}
        <Link to="/nutrition">
          <Item>
          <h2 style={{color:"blue", marginTop:"20%"}}> pigs</h2>
        </Item>
        </Link>
        </Grid>
      </Grid>
    </Box>

          </div>
      </div>
 {/* bar that is located in the homepage containing search functionality of the kholas */}
      
  {/* <div className="homesearchContainer">

      <RenderKholas/>
    </div> */}
    </div>
  );
}

export default Choose;