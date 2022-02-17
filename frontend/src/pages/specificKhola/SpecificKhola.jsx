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
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import GetAppIcon from '@material-ui/icons/GetApp';
import ListBreedsTable from '../listbreedsTable/ListBreedsTable';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  fab: {
    margin: theme.spacing(2),
  },
  absolute: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(3),
  },
}));
  
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
  padding: theme.spacing(1),
  textAlign: 'right',
  color: theme.palette.text.secondary,
}));

export default function SpecificKhola(props) {

  
    // let { id } = useParams();
    const [postKhola, setKholaObject] = useState({});
    //userID and Khola IDs have been declared as global variables in this file
    var id = localStorage.getItem('id');
    var userlivestockNumber = localStorage.getItem('userlivestockNumber');
    var KholaId = localStorage.getItem('KholaId');
    //inintialising the pop over content
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const classes = useStyles();
    let navigate = useNavigate();
  //initialising the input fieldsx
  const initialValues = {
    Name: "",
    type: "",
    Breed: "",
    Vaccinated: "",
  };


  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate( "/home");
     
    }
  }, []);
  
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
  Name: Yup.string().required("You must input a Khola Name!"),
  type: Yup.string().required(),
  Breed: Yup.string().required(),
  Vaccinated: Yup.string().required()
});


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

// onsubmit register the livestock to the database in the backend
const onSubmit = (data) => {
  console.log(data)
   axios
     .post(`http://localhost:3001/api/khola/livestock/${KholaId}`, data, {
       headers: { accessToken: localStorage.getItem("accessToken") },
     })
     .then((response) => {
      handleClose();
      
     }).catch(err=>console.log(err));
 };

 return(
   <div style={{ width: "100%", height: "100%"}}>
      <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        
        <Grid item xs={2}>
          <Item>
            {/* Rendering info about the khola which kacts as a container housing the livestock  of the selected type */}
          <h2 style={{color: "blueviolet"}}>{postKhola.KholaName} Khola</h2>
          <p>Location:{postKhola.Location} </p>
          <p>Animal Type:{postKhola.Animal} </p>
          <p>CreatedAt:{postKhola.createdAt} </p>
          </Item>
        </Grid>
        <Grid item xs={10}>
          <Item2>
          <Typography variant="subtitle1" component="div">
          
          {/* <Button
        variant="contained"
        color="default"
        className={classes.button}
        startIcon={<CloudUploadIcon />}
      >
        Upload
      </Button> */}


      <Tooltip title="Delete">
        <IconButton aria-label="delete">
          <GetAppIcon/>
        </IconButton>
      </Tooltip>
      <Tooltip title="Add Livestock" aria-label="add">
      <Button
        onClick={handleOpen}
        variant="contained"
        color="default"
        className={classes.button}
        startIcon={<AddIcon />}
      >
        Add Livestock
      </Button>
      </Tooltip>
     
          <StyledModal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={open}
        onClose={handleClose}
        BackdropComponent={Backdrop}
      >
        <Box sx={style}>
          <h2 id="unstyled-modal-title" onClick={handleClose} className="close-modal"><CloseIcon style={{width: "40px", height: "40px"}}/></h2>
          <div className="createLivestock">
          <h2 id="unstyled-modal-title">Register Livestock</h2>
          <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
          <label>Livestock Name: </label>
          <ErrorMessage name="Name" component="span" />
          <Field
            autocomplete="off"
            id="inputCreatePost"
            name="Name" 
          />
           <label>Type: </label>
          <ErrorMessage name="type" component="span" />
          <Field
            autocomplete="off"
            id="inputCreatePost"
            name="type"
          />

          <label>Breed: </label>
          <ErrorMessage name="Breed" component="span" />
          <Field
            autocomplete="off"
            id="inputCreatePost"
            name="Breed"
          />

        <label>Vaccination Status: </label>
          <ErrorMessage name="Vaccinated" component="span" />
          <Field
            autocomplete="off"
            id="inputCreatePost"
            name="Vaccinated"
          />

          <button type="submit"> Add Livestock</button>
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
         <h3> You have {userlivestockNumber} {postKhola.Animal}  in your {postKhola.KholaName} Khola as of to date</h3>
         <ListBreedsTable/>
        </Grid>
      </Grid>
    </Box>
   </div>
 );
   
 
}
