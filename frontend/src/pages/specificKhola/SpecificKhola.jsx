import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"; 
import axios from "axios";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Formik, Form, Field, ErrorMessage } from "formik";
import ModalUnstyled from '@mui/base/ModalUnstyled';
import CloseIcon from '@material-ui/icons/Close';
import * as Yup from "yup";
import "./specificKhola.css";
import { Home,
  Add,
  ArrowDownward,
  WorkOutline } from "@material-ui/icons";

  
const StyledModal = styled(ModalUnstyled)`
position: fixed;
z-index: 1300;
right: 0;
bottom: 0;
top: 0;
left: 0;
display: flex;
align-items: center;
justify-content: center;
`;

const Backdrop = styled('div')`
z-index: -1;
position: fixed;
right: 0;
bottom: 0;
top: 0;
left: 0;
background-color: rgba(0, 0, 0, 0.5);
-webkit-tap-highlight-color: transparent;
`;

const style = {
width: 1200,
bgcolor: 'whitesmoke',
// bgcolor: 'background.paper',
border: '2px solid blue',
p: 2,
px: 4,
pb: 3,
};

  

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Item2 = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'right',
  color: theme.palette.text.secondary,
}));

export default function SpecificKhola(props) {
    // let { id } = useParams();
    const [postKhola, setKholaObject] = useState({});
    //userID and Khola IDs have been declared as global variables in this file
    var id = localStorage.getItem('id');
    var KholaId = localStorage.getItem('KholaId');
    //inintialising the pop over content
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    
  //initialising the input fieldsx
  const initialValues = {
    userBreedName: "",
    Dob: "",
    origin: "",
    region: "",
    active: "",
    
  };

  
//persist state after refreshing the page
useEffect(()=> {
  const data = localStorage.getItem('maintain-active-modal-state');
  if(data) {
    setOpen(JSON.parse(data));
  }
  },[]);

useEffect(()=> {
  localStorage.setItem("maintain-active-modal-state", JSON.stringify(open));
});

 //for posting data to the database
  
 const validationSchema = Yup.object().shape({
  userBreedName: Yup.string().required("You must input a Name!"),
  Dob: Yup.string().required(),
  origin: Yup.string().required(),
  region: Yup.string().required(),
  active: Yup.string().required(),
});

//onsubmit function for posting to the database
const onSubmit = (data) => {
  console.log(data)
  
 };


 //for getting data from the database
 useEffect(() => {
    axios.get(`http://localhost:3001/khola/ById/${KholaId}`).then((response) => {
      setKholaObject(response.data);
      console.log(response.data)
    });
  }, []);

    useEffect(() => {     
    axios.get(`http://localhost:3001/khola/ByUserId/${id}/${KholaId}`).then((response) => {
        console.log(response.data);
    });
}, []);

   
 return(
   <div style={{ width: "100%", height: "100%"}}>
      <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={0}>
        
        <Grid item xs={2}>
          <Item>
            {/* Rendering info about the khola which kacts as a container housing the livestock  of the selected type */}
          <h2>{postKhola.KholaName} Khola</h2>
          <h3>Location:{postKhola.Location} </h3>
          <h3>Animal Type:{postKhola.Animal} </h3>
          <h3>CreatedAt:{postKhola.createdAt} </h3>
          </Item>
        </Grid>
        <Grid item xs={10}>
          <Item2>
          <Typography variant="subtitle1" component="div">
          <Add className="icons"  onClick={handleOpen}/><></>
          <ArrowDownward className="icons"/> 
         

          <StyledModal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={open}
        onClose={handleClose}
        BackdropComponent={Backdrop}
      >
        <Box sx={style}>
          <h2 id="unstyled-modal-title" onClick={handleClose} className="close-modal"><CloseIcon style={{width: "50px", height: "50px"}}/></h2>
          <div className="createLivestock">
          <h2 id="unstyled-modal-title">Register Livestock</h2>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
          <label>name: </label>
          <ErrorMessage name="userBreedName" component="span" />
          <Field
            autocomplete="off"
            id="inputCreatePost"
            name="userBreedName"
            placeholder="(Tonde)"
          />
           <label>Date of Birth </label>
          <ErrorMessage name="Dob" component="span" />
          <Field
            autocomplete="off"
            id="inputCreatePost"
            name="Dob"
            placeholder="(20-July-2019)"
          />
          <label>Origin: </label>
          <ErrorMessage name="origin" component="span" />
          <Field
            autocomplete="off"
            id="inputCreatePost"
            name="origin"
            placeholder="(Malawi)"
          />
           <label>Region </label>
          <ErrorMessage name="region" component="span" />
          <Field
            autocomplete="off"
            id="inputCreatePost"
            name="region"
            placeholder="(Northen)"
          />
           <label>Active </label>
          <ErrorMessage name="active" component="span" />
          <Field
            autocomplete="off"
            id="inputCreatePost"
            name="active"
            placeholder="(Yes/No)"
          />
          

          <button type="submit"> Create Livestock</button>
        </Form>
      </Formik>
    </div>
        </Box>
      </StyledModal>
          
          </Typography>
          
              {/* <Link to="/createbreed">
               <button className="AddAnimal"> Register Breed </button>
              </Link> */}
          </Item2>
          kkk
        </Grid>
      </Grid>
    </Box>
   </div>
 );
   
 
}
