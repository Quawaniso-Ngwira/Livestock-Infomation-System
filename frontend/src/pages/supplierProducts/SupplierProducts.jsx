import React, { useContext, useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../helpers/AuthContext";
import './supplierProducts.css';
import Notifications from '../Notifications';

function SupplierProducts() {
  let { id } = useParams();
  const[userId, setUserId] = useState();
  const { authState } = useContext(AuthContext);
  const [notify, setNotify] = useState({isOpen: false, message:"", type:""})

  let navigate = useNavigate();
  const initialValues = {
    Name: "",
    Category: "",
    Description: "",
    Price:"",
  };

  useEffect(()=>{
    setUserId(localStorage.getItem("id"))
}, [])


  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate( "/home");
     
    }
  }, []);
  const validationSchema = Yup.object().shape({
    Name: Yup.string().required("You must input a Product Name!"),
    Category: Yup.string().required(),
    Description: Yup.string().required(),
    Price: Yup.string().required()
  });

  const onSubmit = (data) => {
    setNotify({
      isOpen:true,
      message: 'Submitted Suceessfully',
      type: 'success'
    
    })
    
   var id = localStorage.getItem("id");
   console.log(data);
    axios
      .post(`https://serveriweta.herokuapp.com/product/create/${id}`, data, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        navigate("/supplier");
      });
  };

  return (
    <div className="createPostPage">
      <p>Enter Product Detail(s)</p>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
          <label>Name: </label>
          <ErrorMessage name="Name" component="span" />
          <Field
            autocomplete="off"
            id="inputCreatePost"
            name="Name" 
          />
           <label>Category: </label>
          <ErrorMessage name="Category" component="span" />
          <Field
            component="select"
            autocomplete="off"
            id="inputCreatePost"
            name="Category"
            >
            <option value="choose"> </option>
            <option value="cattle">Vaccine</option>
            <option value="pig">Feed</option>
          </Field>


          <label>Description: </label>
          <ErrorMessage name="Description" component="span" />
          <Field
            autocomplete="off"
            id="inputCreatePost"
            name="Description"
          />
           
  
          <label>Price: </label>
          <ErrorMessage name="Price" component="span" />
          <Field
            autocomplete="off"
            id="inputCreatePost"
            name="Price"
            type="number"
          />

          <button type="submit" style={{cursor: "pointer"}}> Add Product</button>
          {/* ********************************** * */}
          <Notifications
          notify={notify}
          setNotify={setNotify}
          />
 {/* *************************************       */}
    
        </Form>
      </Formik>
    </div>
  );
}

export default SupplierProducts;