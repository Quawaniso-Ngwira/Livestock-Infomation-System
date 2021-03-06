import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate, Link } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";
import User from '../image/login.jpg';

function Registration() {

  const navigate = useNavigate();
  const initialValues = {
    username: "",
    phone:"",
    email:"",
    role: "",
    address:"",
    password: "",
    comfirmPassword: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().min(3).max(15).required(),
    phone: Yup.string().min(10).max(15).required(),
    email: Yup.string().email("Invalid email address format").min(11).max(150).required(),
    role: Yup.string().min(3).max(15).required(),
    address: Yup.string().min(3).max(150).required(),
    password: Yup.string().min(4).max(20).required(),
    comfirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
  });

// onsubmit send the values and navigate to login page
  const onSubmit = (data) => {
    console.log(data)
    axios.post("https://serveriweta.herokuapp.com/auth/register", data).then(() => {
      console.log(data);
      navigate('/login')
    });
  };

  return (
    <div className="createPostPage">
        <h1>Register Account</h1>
        <img src={User} alt="login symbol" style={{ height: "70px", width: "70px"}} />
    
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        
        <Form className="formRegisterContainer">
          <label>Username: </label>
          <ErrorMessage name="username" component="span" />
          <Field
            autocomplete="off"
            id="inputCreatePost"
            name="username"
            
          />
  <label>Phone number: </label>
          <ErrorMessage name="phone" component="span" />
          <Field
            autocomplete="off"
            id="inputCreatePost"
            name="phone"
          />
          
         <label>Email: </label>
          <ErrorMessage name="email" component="span" />
          <Field
            autocomplete="off"
            type="email"
            id="inputCreatePost"
            name="email"
         
          />
           <label>Role: </label>
          <ErrorMessage name="role" component="span" />
          <Field
            component="select"
            autocomplete="off"
            id="inputCreatePost"
            name="role">
          <option value="choose"> --- Select Role --- </option>
          <option value="Farmer">Farmer</option>
          <option value="Supplier">Supplier</option>
        </Field>


          <label>Address: </label>
          <ErrorMessage name="address" component="span" />
          <Field
            autocomplete="off"
            id="inputCreatePost"
            name="address"
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
  
   
  );
}

export default Registration;