import "./kholaSideDetails.css";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"; 
import axios from "axios";
import {  Delete, Edit } from "@material-ui/icons";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

export default function KholaSideDetails() {
   const classes = useStyles();

    const [postKhola, setKholaObject] = useState({});
    let navigate = useNavigate();

    useEffect(() => {
        var KholaId = localStorage.getItem('KholaId');
          axios.get(`http://localhost:3001/khola/ById/${KholaId}`).then((response) => {
            setKholaObject(response.data);
            console.log(response.data)
          });
        }, []);

        //deleting the khola
  const deleteKhola = () => {
    var KholaId = localStorage.getItem('KholaId');
    axios
      .delete(`http://localhost:3001/khola/delete/${KholaId}`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then(() => {
        navigate("/kholaPage");
      });
  };
 
//updating the khola info
const updateKhola = () => {
      navigate("/upDateKhola");
};


  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Khola Name: {postKhola.KholaName}</span> <br/>
        <span className="featuredSub">Location: {postKhola.Location}</span> <br/>
        <span className="featuredSub">Type: {postKhola.AnimalType}</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney"> {postKhola.Number}</span>
        </div>
        <span className="featuredSub">CreatedAt: {postKhola.createdAt}</span>
        <span className="featuredSub"> <br/>

      <Button
        onClick={updateKhola}
        variant="contained"
        color="default"
        className={classes.button}
        startIcon={<EditIcon />}
      >
        Edit
      </Button>
      <Button
        onClick={deleteKhola}
        variant="contained"
        color="secondary"
        className={classes.button}
        startIcon={<DeleteIcon />}
      >
        Delete
      </Button>
        </span>
      </div>
    </div>
  );
}
