import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router"; 
import { Link } from "react-router-dom"; 
import axios from "axios";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';
import { orange } from "@material-ui/core/colors";
import {  TextField, IconButton } from '@material-ui/core';
import { SearchOutlined } from '@material-ui/icons';


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function ListBreedsTable(props) {
  const navigate = useNavigate();
  const [userlivestock, setUserlivestock] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const classes = useStyles();
  const userlivestockNumber = userlivestock.length
  localStorage.setItem("userlivestockNumber", userlivestockNumber);

  useEffect(() => {
    var KholaId = localStorage.getItem('KholaId');
    axios.get(`http://localhost:3001/api/khola/livestock/byId/${KholaId}`).then((response) => {
      setUserlivestock(response.data);
     console.log(response.data);
  });
  }, []);
 
  const deleteLivestock = (KholaId) => {
    axios
      .delete(`http://localhost:3001/api/khola/livestock/${KholaId}`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then(() => {
        setUserlivestock(
          userlivestock.filter((val) => {
            return val.KholaId != KholaId;
          })
        );
      });
  };

 return(
  <TableContainer component={Paper}>
    {/* rendering the search bar inside the table and floating it to the left */}
    {/* {userlivestockNumber} */}
<TextField  className={classes.search}
                style={{margin: "10px"}} 
                onChange={(e) => setSearchTitle(e.target.value)}
                id="standard-bare"
                variant="outlined"
                placeholder="(Search Livestock)"
                InputProps={{
                  endAdornment: (
                    <IconButton>
                      <SearchOutlined />
                    </IconButton>
                  ),
                }}
              />
{/* end of the search feild */}
  <Table className={classes.table} size="small" aria-label="a dense table">
    <TableHead>
      <TableRow style={{fontWeight: "bold"}}>
        <TableCell><h2>Name</h2></TableCell>
        <TableCell align="right"><h2>Type</h2></TableCell>
        <TableCell align="right"><h2>Vaccination Status</h2></TableCell>
        <TableCell align="right"><h2>Breed</h2></TableCell>
        <TableCell align="right"><h2>Actions</h2></TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
   
    {userlivestock.filter((value) => {
            if (searchTitle === "") {
              return value;
            } else if (
              value.Name?.toLowerCase().includes(searchTitle.toLowerCase())
            ) {
              return value;
            }
          }).map((value, key) => {
  return (
    <TableRow key={key}>
    <TableCell component="th" scope="row">
    {value.Name}
    </TableCell>  
     <TableCell align="right">{value.type}</TableCell>
              <TableCell align="right">{value.Breed}</TableCell>
              <TableCell align="right">{value.Vaccinated}</TableCell>
              <TableCell align="right">
              <Edit style={{color: orange}} />
              
                  <Delete className="deletePersonalcomment"
                    onClick={() => {
                      deleteLivestock(value.id);
                    }}
                  >
                  
                  </Delete>
               

              </TableCell>
            </TableRow> 
            )
          })}
             </TableBody>
       </Table>
      </TableContainer>
  
 )
   
}
