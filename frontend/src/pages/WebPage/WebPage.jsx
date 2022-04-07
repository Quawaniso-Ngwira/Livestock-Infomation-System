import React, { useContext, useEffect, useState } from "react";
import './webPage.css';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import khola from '../../image/khola.jpg';
import { makeStyles } from '@material-ui/core/styles';
import Slider from '../../components/slider/Slider'


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

function WebPage() { 
  const classes = useStyles(); 
 
  return (
   <>
      <div className="Layout">
      <h3 style={{marginLeft: "50%"}}>iWeta</h3>
      <p style={{margin: "10%"}}>iWeta Livestock infomation system is a system that intends to help livestock farmers with their livestock infomation needs.
        The systm focus on providing vaccination and feeding information. Our primary target was the local malawian farmer.
        We hope this product will contribute to the development of Malawi espcially in the Livestock sector of Agriculture.
      </p>
      
      <p style={{marginLeft: "40%"}}>+265 YYY YYY YYY/ +265 AAA AAA AAA</p>
      </div>
      {/* <img src={khola} alt="aboutUs" style={{ height: "350px", width: "100%"}}/> */}
   <Slider/>
      </>
  );
}

export default WebPage;