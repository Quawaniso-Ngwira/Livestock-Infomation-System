import React, { useContext, useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../helpers/AuthContext";
import Notifications from '../Notifications';
import {  ArrowBackIos, ArrowBack } from "@material-ui/icons";

function CreateActivity() {
  let { id } = useParams();
  const[userId, setUserId] = useState();
  const { authState } = useContext(AuthContext);
  const [notify, setNotify] = useState({isOpen: false, message:"", type:""})

  let navigate = useNavigate();
  const initialValues = {
    Day: "",
    Activity: "",
   
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
    Day: Yup.string().required("You must input a Product Name!"),
    Activity: Yup.string().required()
  });

  const onSubmit = (data) => {
    setNotify({
      isOpen:true,
      message: 'Submitted Suceessfully',
      type: 'success'
    
    })
    
   var id = localStorage.getItem("KholaId");
   console.log(data);
    axios
      .post(`https://serveriweta.herokuapp.com/schedules/create/${id}`, data, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        navigate("/activites");
      });
  };

  const back = () => {
    navigate("/activites");
};


  return (
      <div className="forum">
          <p onClick={back} className="backArrow"><ArrowBack/>Back</p> 
    <div className="createPostPage">
        
      <p>Create Activity</p>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
          <label>Date: </label>
          <ErrorMessage name="Day" component="span" />
          <Field
            type="date"
            autocomplete="off"
            id="inputCreatePost"
            name="Day" 
          />


          <label>Activity: </label>
          <ErrorMessage name="Activity" component="span" />
          <Field
            autocomplete="off"
            id="inputCreatePost"
            name="Activity"
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
    </div>
  );
}

export default CreateActivity;