import React, { useContext, useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../helpers/AuthContext";
import './createRecord.css';
import Notifications from '../Notifications';
import {  ArrowBackIos, ArrowBack } from "@material-ui/icons";

function CreateRecord() {
  let { id } = useParams();
  const[userId, setUserId] = useState();
  const { authState } = useContext(AuthContext);
  const [isDisabled,setIsDisabled]=useState(false);
  const [isCattle,setIsCattle]=useState();
  const [notify, setNotify] = useState({isOpen: false, message:"", type:""})

  
const [value, setValue] = React.useState("");

  let navigate = useNavigate();
  const initialValues = {
    Date:"",
    Activites: "",
    Diseases: "",
    Affected: "",
    Costs:"",
    Comments: ""
    
  };

  const back = () => {
    navigate("/specificKhola");
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
    Date: Yup.date().required(),
    Activities: Yup.string().required("You must input an activity!"),
    Diseases: Yup.string().required(),
    Affected: Yup.string().required(),
    Costs: Yup.number().required(),
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


  return (
    <div className="forum">
    <p onClick={back} className="backArrow"><ArrowBack/>Back</p> 
    <div className="createPostPage">
    <p>Create Your Record</p>
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      <Form className="formContainer">
          
      <label>Date: </label>
        <ErrorMessage name="Date" component="span" />
        <Field
          autocomplete="off"
          id="inputCreatePost"
          type="date"
          name="Date"
        />

        <label>Activites: </label>
        <ErrorMessage name="Activites" component="span" />
        <Field
          autocomplete="off"
          id="inputCreatePost"
          name="Activites" 
        />
         <label>Diseases: </label>
        <ErrorMessage name="Diseases" component="span" />
        <Field
          autocomplete="off"
          id="inputCreatePost"
          name="Diseases"
        />

        <label>Affected: </label>
        <ErrorMessage name="Affected" component="span" />
        <Field 
          autocomplete="off"
          id="inputCreatePost"
          name="Affected"
        
        />
           
         
        <label>Costs: </label>
        <ErrorMessage name="Costs" component="span" />
        <Field
          autocomplete="off"
          id="inputCreatePost"
          name="Costs"
        />

      <label>Comments: </label>
        <ErrorMessage name="Comments" component="span" />
        <Field
          autocomplete="off"
          id="inputCreatePost"
          type="text"
          name="Comments"
        />
    

          <button type="submit" style={{cursor: "pointer"}}> Create Record</button>
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
