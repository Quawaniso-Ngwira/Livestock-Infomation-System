import React, { useContext, useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../helpers/AuthContext";
import Notifications from '../Notifications';
import {  ArrowBackIos, ArrowBack } from "@material-ui/icons";

function CreateRecord() {
  let { id } = useParams();
  const[userId, setUserId] = useState();
  const { authState } = useContext(AuthContext);
  const [notify, setNotify] = useState({isOpen: false, message:"", type:""})

  let navigate = useNavigate();
  const initialValues = {
    Day: "",
    Activities: "",
    Diseases: "",
    Affected: "",
    Costs: "",
    Comments: "" 
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
    Day: Yup.string().required("You must input a Date!"),
    Activities: Yup.string().required(),
    Diseases: Yup.string().required(),
    Affected: Yup.string().required(),
    Costs: Yup.string().required(),
    Comments: Yup.string().required()
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
      .post(`https://serveriweta.herokuapp.com/records/create/${id}`, data, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        navigate("/dairyRecording");
      });
  };

  const back = () => {
    navigate("/dairyRecording");
};


  return (
      <div className="forum">
          <p onClick={back} className="backArrow"><ArrowBack/>Back</p> 
    <div className="createPostPage">
        
      <p>Create Record</p>
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
          <ErrorMessage name="Activities" component="span" />
          <Field
            autocomplete="off"
            id="inputCreatePost"
            name="Activities"
          />

       <label>Diseases: </label>
          <ErrorMessage name="Diseases" component="span" />
          <Field
            type="text"
            autocomplete="off"
            id="inputCreatePost"
            name="Diseases" 
          />

        <label>Affected: </label>
          <ErrorMessage name="Affected" component="span" />
          <Field
            type="text"
            autocomplete="off"
            id="inputCreatePost"
            name="Affected" 
          />

      <label>Costs: </label>
          <ErrorMessage name="Costs" component="span" />
          <Field
            type="number"
            autocomplete="off"
            id="inputCreatePost"
            name="Costs" 
          />

      <label>Comments: </label>
          <ErrorMessage name="Comments" component="span" />
          <Field
            type="text"
            autocomplete="off"
            id="inputCreatePost"
            name="Comments" 
          />
           
          <button type="submit" style={{cursor: "pointer"}}> Add Record</button>
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

export default CreateRecord;