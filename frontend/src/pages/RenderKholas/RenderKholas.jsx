import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router"; 
import { Link } from "react-router-dom"; 
import axios from "axios";
import {  TextField, IconButton } from '@material-ui/core';
import { SearchOutlined } from '@material-ui/icons';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
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
  const [listOfKhola, setListOfKhola] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [age, setAge] = React.useState('');
  const [region, setRegion] = React.useState('');
  const [show, setShow] = React.useState('');
  const [type, setType] = React.useState('');

  const classes = useStyles();

  const handleChange = (event) => {
    setAge(event.target.value);
    setRegion(event.target.value);
    setShow(event.target.value);
    setType(event.target.value);
  };


  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    } else {
     console.log("")
    }
  }, []);

  


  useEffect(() => { 
  var id = localStorage.getItem('id');
    axios.get(`http://localhost:3001/khola/ByUserId/${id}`).then((response) => {
        console.log(response.data);
       setListOfKhola(response.data);
        console.log(id);
    });
}, []);


 return(
   <div>
     
    <div className="searchKholabar">
<div>
  
  <TextField style={{margin: "10px"}}
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
              <div style={{display: "flex"}}> 
    <h4>Show:</h4>
    <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">All</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={show}
          onChange={handleChange}
          label="All"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>All</MenuItem>
          <MenuItem value={20}>Partial</MenuItem>
        
        </Select>
      </FormControl>
      </div>

      <div style={{display: "flex"}}> 
        <h4>SortBy:</h4>
    <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">Region</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={region}
          onChange={handleChange}
          label="Age"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Northen</MenuItem>
          <MenuItem value={20}>Central</MenuItem>
          <MenuItem value={30}>Sourthen</MenuItem>
        </Select>
      </FormControl>
      </div>

      <div style={{display: "flex"}}> 
        <h4>Filter:</h4>
    <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">Type</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={type}
          onChange={handleChange}
          label="type"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Cattle</MenuItem>
          <MenuItem value={20}>Pig</MenuItem>
         
        </Select>
      </FormControl>
      </div>
      </div>
     {listOfKhola.filter((value) => {
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
             <h3 className="breedname">{value.KholaName} </h3> </div>
              </div> </div>
           </div>
            
            
          </div>
        );
      })}


   </div>
 )
   

}
