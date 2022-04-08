import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import khola from '../image/khola.jpg';
import { makeStyles } from '@material-ui/core/styles';
import Slider from '../components/slider/Slider'
import Button from '@material-ui/core/Button';
import {  Link } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import expand from '../image/expand.png';
import axios from "axios";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));



function Home() {  
  const navigate = useNavigate();
  const classes = useStyles();
  const [users, setUsers] = useState([]);
  
  useEffect(() => { 

      axios.get("http://localhost:3001/auth/users").then((response) => {
          console.log(response.data);
          setUsers(response.data);
          
      });
  }, []);

  const navigateM = () =>{
    navigate("/forum");
  };
 
  return (
    <div>
   <div className="display">
      <div className="Layout">
      <h3 style={{marginLeft: "50%"}}>iWeta</h3>
      <p style={{margin: "10%"}}>iWeta Livestock infomation system is a system that intends to help livestock farmers with their livestock infomation needs.
        The systm focus on providing vaccination and feeding information. Our primary target was the local malawian farmer.
        We hope this product will contribute to the development of Malawi espcially in the Livestock sector of Agriculture.
      </p>
      
      <Link to="/createKhola">
              <Button style={{marginLeft: "40%"}}variant="contained">
               Getting Started
              </Button>
              </Link>

              <br/>
              
      </div>
     
   <Slider/>
   
      </div>
      
<br/><br/><br/><br/><br/><hr/>
<div className={classes.root}>
      <Grid container spacing={3}>
       
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>
            <h3>Trusted Users Countrywide</h3>
            <h1 style={{fontSize: "40px"}}>{users.length}<img src={expand} alt="User who commented" style={{ height: "2.5%", width: "2.5%"}}/></h1>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>
          <h3>Check Our Interactive Posts</h3>
          <h1 style={{fontSize: "40px"}} onClick={navigateM}><img src={expand} alt="User who commented" style={{ height: "3.5%", width: "3.5%"}}/></h1>
          </Paper>
        </Grid>
      </Grid>
    </div>

      </div>
  );
}

export default Home;