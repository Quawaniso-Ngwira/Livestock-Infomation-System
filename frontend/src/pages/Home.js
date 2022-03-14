import React, { useContext } from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import { AuthContext } from "../helpers/AuthContext";
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import cattlepig from '../image/livestock_banner.jpg';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {  Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import Chart from './Charts/BarChart';
//notification
import Notification from "./notifications/notifications";


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


function Home() {

  // initialising classes to the methodof UseStyles() method
  const classes = useStyles();
  

  const { authState } = useContext(AuthContext);
  let navigate = useNavigate();
   var listOfKholaNumber = localStorage.getItem("listOfKholaNumber");
  
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
          <Item className={classes.root}>
             
             <h2 style={{color:"blue"}}> Livestock Information System</h2>
             <p>iWeta gives you all the infomation you need
                for sucessful cattle and pig production</p>
                <br/><br/><br/>
              {/* Button that allows the user of the system to fill the form to create a khola */}
              <Link to="/createKhola">
                <Button variant="contained" color="secondary" >
                    <p style={{color: "white"}}> Create Your Khola</p>
                </Button>
                </Link>
                
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item>
            <Chart style={{width: "50", height: "50"}}/>
          {/* <img src={cattlepig} alt="cattlepig pic" style={{ height: "100%", width: "100%"}} className=""/> */}
          <Notification/>
            </Item>
        </Grid>
        <Grid item xs={6}>
          <Item>xs=4</Item>
        </Grid>
        <Grid item xs={6}>
          <Item>
          <h2> Number of Your Kholas</h2>
         <h1> {listOfKholaNumber} </h1>
         <p> Compared to last month</p>
          </Item>
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

export default Home;