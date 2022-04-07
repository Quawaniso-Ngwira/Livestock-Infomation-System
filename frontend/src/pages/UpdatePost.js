import React, { useContext } from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {  ArrowBackIos, ArrowBack } from "@material-ui/icons";

function UpdatePost() {
  const [ Title, setTitle] = useState('');
  const [ PostText, setPostText] = useState('');
  let navigate = useNavigate();
  
  const back = () => {
    var id = localStorage.getItem('PostId');
    navigate(`/post/${id}`);
};

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    } else {
     console.log("")
    }
  }, []);

  
 // getting list of user products based on user id 
 useEffect(() => { 
    var id = localStorage.getItem('PostId');
    axios.get(`http://localhost:3001/posts/byId/${id}`).then((response) => {
          console.log(response.data);
           // console.log(response.data.Name);
          setTitle(response.data.title);
           // console.log(response.data.AnimalType);
          setPostText(response.data.postText);
        
          
      });
  }, []);

  //updating the khola info
const updatePost = () => {
  
  // data to be updated crucial
const data = {
  Title: Title,
  PostText: PostText
  
 
}
////updatePost/:postId
 var PostId = localStorage.getItem('PostId'); 
  axios
    .put(`http://localhost:3001/posts/updatePost/${PostId}`, data)
    .then(() => {
       navigate(`/post/${PostId}`);
    });
};

  
  return (
 //login page forms
 <div className="forum"> 
  <p onClick={back} className="backArrow"><ArrowBack/>Back</p> 
 <div className="createPostPage">
 <h1>Update Post</h1>
 
    <div className="formContainer__">
<label>Title:</label>
<input
 type="text"
 value={Title}
 onChange={(e)=>{setTitle(e.target.value)}}
/>

<label>Post:</label>
<input
 type="text"
 value={PostText}
 onChange={(e)=>{setPostText(e.target.value)}}
/>

<button onClick={updatePost} style={{cursor: "pointer"}}> Update Post</button>
</div>
</div>
</div>
  );
}

export default UpdatePost;