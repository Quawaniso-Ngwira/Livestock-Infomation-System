import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { makeStyles } from '@material-ui/core/styles';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import UserComment from '../../image/commentUser.jpg'
import Button from '@material-ui/core/Button';



const useStyles = makeStyles((theme) => ({

  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  height: '300px',
  color: theme.palette.text.primary,
}));


function PostWeb() {
  const classes = useStyles();
  let { id } = useParams();
  const [postObject, setPostObject] = useState({});
  const [comments, setComments] = useState([]);
  const numberOfComments = comments.length
  localStorage.setItem("numberOfComments", numberOfComments);
  const [newComment, setNewComment] = useState("");

  let navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3001/posts/byId/${id}`).then((response) => {
      setPostObject(response.data);
    });

    axios.get(`http://localhost:3001/comments/${id}`).then((response) => {
      setComments(response.data);
    });
  }, []);

  return (
    <div className="postPage">
      <div className="postlayout">
    <Box sx={{ width: '100%' }}>
    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      <Grid item xs={10}>
        <Item>
        <div className="" id="individual">
          <div className="title"> {postObject.title} </div>
          <div className="">{postObject.postText}</div>
         
         </div>
        </Item>
      </Grid>
      <Grid item xs={2}>
        <Item>
        <p>Posted by:</p> <h3>{postObject.username} </h3>
        <div className="">
           
          </div>
        </Item>
      </Grid>
    </Grid>
    <div className="listOfComments">
          {comments.map((comment, key) => {
            return (
              <div key={key} className="comment">
                {comment.commentBody}
                
                <br/>
                <br/>
                 <label style={{color: "#002178"}}>
                   
 <img src={UserComment} alt="User who commented" style={{ height: "1%", width: "4%"}}/>
          
                    {comment.username}</label>
              </div>
            );
          })}
        </div>
  </Box>
  </div>
  </div>
  );
}
export default PostWeb;
