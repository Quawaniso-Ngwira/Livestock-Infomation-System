import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router"; 
import axios from "axios";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import commentUser from '../image/commentUser.jpg';
import expand from '../image/expand.png';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function Profile(){
  var id = localStorage.getItem('id');
  var userlivestockNumber = localStorage.getItem('userlivestockNumber');
  var listOfKholaNumber = localStorage.getItem('listOfKholaNumber');
    const navigate = useNavigate();
    const [listOfPosts, setListOfPosts] = useState([]);

    
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
  });

//persist state after refreshing the page
  useEffect(()=> {
  const data = localStorage.getItem('maintain-logged-in-state');
  if(data) {
    setAuthState(JSON.parse(data));
  }
  },[]);


// verify that the user has a valid token and is aunthticated
useEffect(() => {
  axios
    .get("http://localhost:3001/auth/login", {
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      },
    })
    .then((response) => {
      if (response.data.error) {
        setAuthState({ ...authState, status: false });
      } else {
        setAuthState({
          username: response.data.username,
          id: response.data.id,
          status: true,
        });
      }
    });
  
}, []);

useEffect(() => { 
    axios.get(`http://localhost:3001/posts/byuserId/${id}`).then((response) => {
        setListOfPosts(response.data);
    });
}, []);

    return (
    
    <div className="basicInfo">

<Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={4}>

          <Item>
          <div className="">
            { " "}
            
            <img src={commentUser} alt="User who commented" style={{ height: "4%", width: "10%"}}/>
            <h3 style={{color: "blue", padding: "15px"}}> {authState.username}'s Profile </h3>
           
             </div>
          </Item>
          
        </Grid>
        <Grid item xs={8}>
          <Item>
          
            <h3>Your Livestock: {userlivestockNumber}  <img src={expand} alt="User who commented" style={{ height: "1.5%", width: "1.5%"}}/></h3>
            <h3>Your Kholas Number: {listOfKholaNumber}  <img src={expand} alt="User who commented" style={{ height: "1.5%", width: "1.5%"}}/></h3>
            <h3>Notifications: {userlivestockNumber}  <img src={expand} alt="User who commented" style={{ height: "1.5%", width: "1.5%"}}/></h3>
            <h3>Events: {listOfKholaNumber}  <img src={expand} alt="User who commented" style={{ height: "1.5%", width: "1.5%"}}/></h3>
          </Item>
        </Grid>
        <Grid item xs={4}>
          <Item style={{backgroundColor: "whitesmoke"}}>
            
            </Item>
        </Grid>
        <Grid item xs={8}>

          <Item>
          <div className="listOfPosts">
<h2>Your Post Queries Appear Here!!!</h2>
{listOfPosts.map((value, key) => {
return (
  <div key={key} className="post">
    <div className="title"> {value.title} </div>
    <div
      className="body"
      onClick={() => {
       navigate(`/post/${value.id}`);
      }}
    >
      {value.postText}
    </div>
    <div className="footer">
      <div className="username">{value.username}</div>
      <div className="buttons">


        <label> {value.Likes.length}</label>
      </div>
    </div>
  </div>
);
})}

</div>
          </Item>

        </Grid>
      </Grid>
    </Box>
       
       
    </div>
    )
}
export default Profile;