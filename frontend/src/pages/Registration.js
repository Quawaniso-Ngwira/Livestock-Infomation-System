import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate, Link } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import SignUp from '../image/signup.jpg';

// style for the papers from material ui framework
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  height: '75%',
  color: theme.palette.text.secondary,
}));


function Registration() {

  const navigate = useNavigate();
  const initialValues = {
    username: "",
    email: "",
    password: "",
    comfirmPassword: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().min(3).max(15).required(),
    email: Yup.string().email("Invalid email address format").min(11).max(150).required(),
    password: Yup.string().min(4).max(20).required(),
    comfirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
  });

// onsubmit send the values and navigate to login page
  const onSubmit = (data) => {
    axios.post("http://localhost:3001/auth", data).then(() => {
      console.log(data);
      navigate('/login')
    });
  };

  

  return (
    <Box sx={{ width: '100%' }}>
    <Grid container rowSpacing={10} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      <Grid item xs={4}>
        <Item>
          <img src={SignUp} alt="livestock pic" className="imagesignup"/>
            </Item>
      </Grid>
      <Grid item xs={8}>
      <Item>
        <h1>Register Account</h1>
     <div className="createPostPage">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        
        <Form className="formContainer">
          <label>Username: </label>
          <ErrorMessage name="username" component="span" />
          <Field
            autocomplete="off"
            id="inputCreatePost"
            name="username"
            
          />


         <label>Email: </label>
          <ErrorMessage name="email" component="span" />
          <Field
            autocomplete="off"
            type="email"
            id="inputCreatePost"
            name="email"
         
          />
        
          <label>Password: </label>
          <ErrorMessage name="password" component="span" />
          <Field
            autocomplete="off"
            type="password"
            id="inputCreatePost"
            name="password"
         
          />

          <label>Comfirm Password: </label>
          <ErrorMessage name="comfirmPassword" component="span" />
          <Field
            autocomplete="off"
            type="password"
            id="inputCreatePost"
            name="comfirmPassword"
           
          />

          <button type="submit"> Register</button>
          <Link to="/login"><p className="RegisterStatement" style={{color: 'orangered'}}>Already registered? go to login</p></Link>
       
        </Form>
      </Formik>
    </div>
    </Item>
      </Grid>
    </Grid>
  </Box>
   
  );
}

export default Registration;