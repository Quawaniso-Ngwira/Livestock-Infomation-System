import React, { useContext, useEffect, useState } from "react";
import './aboutUs.css';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import animals from '../../image/livestock_banner.jpg';
import facebook from '../../image/facebook.png';
import twitter from '../../image/twitter.jpg';
import whatsapp from '../../image/watsapp.png';
import khola from '../../image/khola.jpg';
import iweta from '../../image/IMG-20220120-WA0010.png';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@material-ui/core/styles';


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


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

function AboutUs() { 
  const classes = useStyles(); 
 
  return (
   <>
          <img src={khola} alt="aboutUs" style={{ height: "350px", width: "100%"}}/>
   
      <div className="Layout">
      <h3 style={{marginLeft: "50%"}}>ABOUT US</h3>
      <p>iWeta Livestock infomation system is a system that intends to help livestock farmers with their livestock infomation needs.
        The systm focus on providing vaccination and feeding information. Our primary target was the local malawian farmer.
        We hope this product will contribute to the development of Malawi espcially in the Livestock sector of Agriculture.
      </p>
      <p style={{marginLeft: "40%"}}>+265 YYY YYY YYY/ +265 AAA AAA AAA</p>
      </div>
      </>
  );
}

export default AboutUs;