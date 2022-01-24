import React, { useContext, useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../helpers/AuthContext";
import { useParams } from "react-router"; 


function NewBreed() {
<<<<<<< HEAD
  const[userId, setUserId] = useState();
  const [listOfBreeds, setListOfBreeds] = useState([]);
=======
  let { id } = useParams();
  //const[userId, setUserId] = useState();
>>>>>>> b29e97016f5b3c261a36818af45c57a6b08953a5
  const { authState } = useContext(AuthContext);

  let navigate = useNavigate();
  const initialValues = {
    breedName: "",
    origin: "",
    active: "",
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
    breedName: Yup.string().required("You must input a Title!"),
    origin: Yup.string().required(),
    active: Yup.string().required()
  });

  const onSubmit = (data) => {
    axios
      .post("http://localhost:3001/api/breeds", data, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
<<<<<<< HEAD
        navigate( `/production/${userId}`);
=======
        navigate(`/production`);
>>>>>>> b29e97016f5b3c261a36818af45c57a6b08953a5
      });
  };

  return (
    <div className="createPostPage">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
          <label>name: </label>
          <ErrorMessage name="breedName" component="span" />
          <Field
            autocomplete="off"
            id="inputCreatePost"
            name="breedName"
            placeholder="(Ex. Title...)"
          />
           <label>Origin </label>
          <ErrorMessage name="origin" component="span" />
          <Field
            autocomplete="off"
            id="inputCreatePost"
            name="origin"
            placeholder="(Ex. Title...)"
          />
          <label>Active: </label>
          <ErrorMessage name="active" component="span" />
          <Field
            autocomplete="off"
            id="inputCreatePost"
            name="active"
            placeholder="(Ex. Post...)"
          />

          <button type="submit"> Create Post</button>
        </Form>
      </Formik>
    </div>
  );
}

export default NewBreed;