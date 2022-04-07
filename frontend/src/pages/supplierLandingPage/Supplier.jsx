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
import './supplier.css';

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


function Supplier() {

  // initialising classes to the methodof UseStyles() method
  const classes = useStyles();
  const [products, setProducts] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
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
  var id = localStorage.getItem('id');
    axios.get(`https://serveriweta.herokuapp.com/product/bySupplier/${id}`).then((response) => {
        console.log(response.data);
       setProducts(response.data);
        
    });
}, []);


//deleting the product 
// const deleteProduct = () => {
//   var id = localStorage.getItem('id');
//   axios
//     .delete(`http://localhost:3001/product/delete/${id}`, {
//       headers: { accessToken: localStorage.getItem("accessToken") },
//     })
//     .then(() => {
//       navigate("/supplier");
//     });
//   };


  return (
    <div className="home">
           
           <br/><br/>

           <TextField style={{margin: "10px", backgroundColor: "#fafafa"}}
          onChange={(e) => setSearchTitle(e.target.value)}
               
                id="standard-bare"
                variant="outlined"
                placeholder="(Search Product)"
                InputProps={{
                  endAdornment: (
                    <IconButton>
                      <SearchOutlined />
                    </IconButton>
                  ),
                }}
              />
              <hr/>
             
       <h2 style={{textAlign: "center"}}> Your Products</h2>
    
 <div className="cards-container">

 {products.filter((value) => {
            if (searchTitle === "") {
              return value;
            } else if (
              value.Name?.toLowerCase().includes(searchTitle.toLowerCase())
            ) {
              return value;
            }
          }).map((value, key) => {
  return (
     
  <div key={key} className="card">
     <div  onClick={() => {            
    navigate("/SupplierSProduct");
    localStorage.setItem("ProductId", JSON.stringify(value.ProductId))
   }}>
            <div className="card__title">{value.Name} </div>
            <div className="card__body">
            <h3 className="breedname">{value.Description} </h3>
            <h3 className="breedname">{value.Category} </h3>
            <h3 className="breedname">MK: {value.Price} </h3>
           
            </div>
           </div>
        </div>

        );
      })}

</div>

     </div>
   
 
    
  );
}

export default Supplier;