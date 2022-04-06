import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {  TextField, IconButton } from '@material-ui/core';
import { SearchOutlined } from '@material-ui/icons';
import axios from "axios";
import "./dairyRecordings.css";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";



export default function DairyRecordings() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const [product, setKholaObject] = useState({});
    const [listOfPosts, setListOfPosts] = useState([]);
    const [likedPosts, setLikedPosts] = useState([]);
    const [makolaById, setMakolaById] = useState([]);
    const [searchTitle, setSearchTitle] = useState("");
    let navigate = useNavigate();

    const initialValues = {
      Day: "",
      Activities: "",
      Deseases: "",
      Affected:"",
      Costs:"",
      Comments:"",
    };

    const validationSchema = Yup.object().shape({
      Day: Yup.string().required("You must input a Product Name!"),
      Activities: Yup.string().required(),
      // Deseases: Yup.string().required(),
      // Affected: Yup.string().required(),
      // Costs: Yup.string().required(),
      // Comments: Yup.string().required()
    });

 
  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate( "/home");
     
    }
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    } else {
      axios
        .get("http://localhost:3001/posts", {
          headers: { accessToken: localStorage.getItem("accessToken") },
        })
        .then((response) => {
          setListOfPosts(response.data.listOfPosts);
          setLikedPosts(
            response.data.likedPosts.map((like) => {
              return like.PostId;
            })
          );
        });
    }
  }, []);


  
  useEffect(() => {
    var KholaId = localStorage.getItem('KholaId');
      axios.get(`http://localhost:3001/khola/ById/${KholaId}`).then((response) => {
        setKholaObject(response.data);
        console.log(response.data)
      });
    }, []);

    
  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    } else {
     console.log("")
    }
  }, []);

   ///khola/ByUserId/
   useEffect(() => { 
    var id = localStorage.getItem('id');
      axios.get(`http://localhost:3001/khola/ByUserId/${id}`).then((response) => {
          console.log(response.data);
         setMakolaById(response.data);
          
      });
  }, []);

  const onSubmit = (data) => {

  console.log(data);
  };

  

 return(
    <>
    
    
    <div  className="cards__order__">
    <div className="card__title" >{product.KholaName} Khola</div>
    <hr/>
    <div className="card__body"> 
     <p className="breedname"> {product.Location} </p>
     <p className="breedname"> {product.Number} {product.AnimalType} </p>
     <p className="breedname"> {product.Breed} </p>
  

      </div>
   </div>
  
{/* //    break here */}
<div  className="cards__order__two__">
<div className="card__title" ><div> {product.KholaName} Khola Schedules</div><div>       <Button variant="outlined" color="primary" onClick={handleClickOpen}>
       Add Activity
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add activity</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Want to keep a record?, please fill the form here to record event.
          </DialogContentText>
          
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
          <label>Day: </label>
          <ErrorMessage name="Day" component="span" />
          <Field
            autocomplete="off"
            id="inputCreatePost"
            name="Day" 
            type="date"
          />
           <label>Activities: </label>
          <ErrorMessage name="Activities" component="span" />
          <Field
            autocomplete="off"
            id="inputCreatePost"
            name="Activities"
            type="text"
            />
        
          <label>Deseases: </label>
          <ErrorMessage name="Deseases" component="span" />
          <Field
            autocomplete="off"
            id="inputCreatePost"
            name="Deseases"
          />
           
  
          <label>Affected: </label>
          <ErrorMessage name="Affected" component="span" />
          <Field
            autocomplete="off"
            id="inputCreatePost"
            name="Affected"
            type="text"
          />

          
        <label>Costs: </label>
          <ErrorMessage name="Costs" component="span" />
          <Field
            autocomplete="off"
            id="inputCreatePost"
            name="Costs"
            type="number"
          />

          
        <label>Comments: </label>
          <ErrorMessage name="Comments" component="span" />
          <Field
            autocomplete="off"
            id="inputCreatePost"
            name="Comments"
            type="text"
          />

          <button type="submit" style={{cursor: "pointer"}}> Add Activity</button>
        
        </Form>
      </Formik>
        </DialogContent>
        <DialogActions>
        </DialogActions>
      </Dialog>
</div></div>
<div className="card__body">
 <p className="breedname"> 
 {listOfPosts.map((value, key) => {
        return (
          <div key={key} className="post">
            <div className="title"> {value.title} </div>
            <div >
              {/* {value.postText} */}
            </div>
            </div>
      
        );
      })}
  </p>

  </div>
</div>
</>
 );
   
 
}
