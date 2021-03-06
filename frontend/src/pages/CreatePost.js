import React, { useContext, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import {  ArrowBackIos, ArrowBack } from "@material-ui/icons";

function CreatePost() {
  const { authState } = useContext(AuthContext);

  let navigate = useNavigate();
  const initialValues = {
    title: "",
    postText: "",
  };

  const back = () => {
    var id = localStorage.getItem('PostId');
    navigate("/forum");
};

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    }
  }, []);
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("You must input a Title!"),
    postText: Yup.string().required(),
  });

  const onSubmit = (data) => {
    axios
      .post("https://serveriweta.herokuapp.com/posts/create", data, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        navigate("/forum");
      });
  };

  return (

    <div className="forum">
    <p onClick={back} className="backArrow"><ArrowBack/>Back</p> 
    <div className="createPostPage">
    <p>Create Post</p>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
          <label>Title: </label>
          <ErrorMessage name="title" component="span" />
          <Field
            autocomplete="off"
            id="inputCreatePost"
            name="title"
          />
          <label>Post: </label>
          <ErrorMessage name="postText" component="span" />
          <Field
            autocomplete="off"
            id="inputCreatePost"
            name="postText"
          />

          <button type="submit"> Create Post</button>
        </Form>
      </Formik>
    </div>
 </div>
  );
}

export default CreatePost;