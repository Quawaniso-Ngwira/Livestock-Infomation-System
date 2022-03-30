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
import {  DeleteOutline, EditOutlined, SearchOutlined  } from "@material-ui/icons";



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

function SupplierSProduct() {
  
  const [singleProduct, setSingleProduct] = useState();
  let navigate = useNavigate();
  

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    } else {
     console.log("")
    }
  }, []);

  
 // getting list of user products based on user id 
 useEffect(() => { 
    var ProductId = localStorage.getItem('ProductId');
      axios.get(`http://localhost:3001/product/byId/${ProductId}`).then((response) => {
          console.log(response.data);
         setSingleProduct(response.data);
          
      });
  }, []);
  
  return (
  <div>
     {/* <p> {singleProduct.Name} </p> */}
  </div>
    
  );
}

export default SupplierSProduct;