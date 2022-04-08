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
import Notifications from '../Notifications';
import './supplierSProduct.css';



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
  const [ Name, setName] = useState('');
  const [ Category, setCategory] = useState('');
  const [ Description, setDescription] = useState('');
  const [ Price, setPrice] = useState('');
  const [notify, setNotify] = useState({isOpen: false, message:"", type:""})
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
      axios.get(`https://serveriweta.herokuapp.com/product/byId/${ProductId}`).then((response) => {
          console.log(response.data);
           // console.log(response.data.Name);
          setName(response.data.Name);
           // console.log(response.data.AnimalType);
          setDescription(response.data.Description);
           // console.log(response.data.Cateogry);
          setCategory(response.data.Category);
          //console.log(response.data.Price)
          setPrice(response.data.Price);
          
      });
  }, []);

  //updating the khola info
const updateProduct = () => {
  setNotify({
    isOpen:true,
    message: 'Submitted Suceessfully',
    type: 'success'
  
  })
  // data to be updated crucial
const data = {
  Name: Name,
  Description: Description,
  Category: Category,
  Price: Price
 
}
///product/update/:id
  var ProductId = localStorage.getItem('ProductId');
  axios
    .put(`http://localhost:3001/product/update/${ProductId}`, data)
    .then(() => {
      navigate("/supplier");
    });
};

//deleting the product 
const deleteProduct = () => {
  var productId = localStorage.getItem('ProductId');
  axios
    .delete(`http://localhost:3001/product/delete/${productId}`, {
      headers: { accessToken: localStorage.getItem("accessToken") },
    })
    .then(() => {
      navigate("/supplier");
    });
  };
  
  return (
 //login page forms
 <div className="Container"> 
 <h1>Edit/Delete Product</h1>
 
    <div className="Container">
<label>Name:</label>
<input
 type="text"
 value={Name}
 onChange={(e)=>{setName(e.target.value)}}
/>
<label>Desription:</label>
<input
 type="text"
 value={Description}
 onChange={(e)=>{setDescription(e.target.value)}}
/>
<label>Category:</label>
<input
 type="text"
 value={Category}
 onChange={(e)=>{setCategory(e.target.value)}}
/>
<label>Price:</label>
<input
 type="number"
 value={Price}
 onChange={(e)=>{setPrice(e.target.value)}}
/>

<button onClick={updateProduct} style={{cursor: "pointer"}}> Update Product</button>
<button onClick={deleteProduct} style={{cursor: "pointer"}}> Delete Product</button>
   {/* ********************************** * */}
   <Notifications
   notify={notify}
   setNotify={setNotify}
   />
{/* *************************************       */}
</div>
</div>
  );
}

export default SupplierSProduct;