import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {  TextField, IconButton } from '@material-ui/core';
import { SearchOutlined } from '@material-ui/icons';
import "./nutrition.css";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  height: '300px',
  color: theme.palette.text.secondary,
}));

export default function Nutrition() {

  let navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    } else {
     console.log("")
    }
  }, []);


  return (
    <div className="user">
       <TextField style={{margin: "10px"}}
                fullWidth
                id="standard-bare"
                variant="outlined"
                placeholder="(Search Diseases)"
                InputProps={{
                  endAdornment: (
                    <IconButton>
                      <SearchOutlined />
                    </IconButton>
                  ),
                }}
              />
      <div className="homeWidgets">
      
      <Box sx={{ width: '100%' }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
          <Item>
           <h2>Tuberculosis</h2> 
           <h4>Signs and Symptoms</h4>
           <p>Running nose</p>
           <p>Restless</p>
           <p>Coughing</p>
           
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item>
          <h2>Bovine Viral Diarrhoea (BVD)</h2> 
           <h4>Signs and Symptoms</h4>
           <p>Running nose</p>
           <p>Restless</p>
           <p>Coughing</p>
           
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item>
          <h2>Bluetongue</h2> 
           <h4>Signs and Symptoms</h4>
           <p>Running nose</p>
           <p>Restless</p>
           <p>Coughing</p>
           
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item>
          <h2>Foot and Mouth disease</h2> 
           <h4>Signs and Symptoms</h4>
           <p>Running nose</p>
           <p>Restless</p>
           <p>Coughing</p>
           
          </Item>
        </Grid>
      </Grid>
    </Box>
        </div>
    </div>
  );
}
