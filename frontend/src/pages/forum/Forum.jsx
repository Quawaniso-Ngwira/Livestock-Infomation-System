import "./forum.css";
import React, { useContext } from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import { AuthContext } from "../../helpers/AuthContext";
import {  Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
//socket io


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'right',
    color: theme.palette.text.primary,
  },
}));

export default function Forum() {
  const classes = useStyles();
  const [listOfPosts, setListOfPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const { authState } = useContext(AuthContext);
  const listOfPostsNumber = listOfPosts.length
  let navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    } else {
      axios
        .get("http://localhost:3001/posts", {
          headers: { accessToken: localStorage.getItem("accessToken") },
        })
        .then((response) => {
          setListOfPosts(response.data.listOfPosts);
          setLikedPosts(
            response.data.likedPosts.map((like) => {
              return like.PostId;
            })
          );
        });
    }
  }, []);


  const likeAPost = (postId) => {
    axios
      .post(
        "http://localhost:3001/likes",
        { PostId: postId },
        { headers: { accessToken: localStorage.getItem("accessToken") } }
      )
      .then((response) => {
        setListOfPosts(
          listOfPosts.map((post) => {
            if (post.id === postId) {
              if (response.data.liked) {
                return { ...post,Likes: [...post.Likes, 0],};
              } else {
                const likesArray = post.Likes;
                likesArray.pop();
                return { ...post, Likes: likesArray };
              }
            } else {
              return post;
            }
          })
        );

        if (likedPosts.includes(postId)) {
          setLikedPosts(
            likedPosts.filter((id) => {
              return id != postId;
            })
          );
        } else {
          setLikedPosts([...likedPosts, postId]);
        }
      });
  };


  return (
    <div className="forum">


<div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          
    <Paper className={classes.paper}>
          <Link to="/createpost">   
      <Button
        variant="contained"
        color="default"
        className={classes.button}
        startIcon={<AddIcon />}
      >
        Publish Querry
      </Button>
      </Link> 
      </Paper>


        </Grid>
        
      </Grid>
    </div>


{/* 

<Link to="/createpost">
               <button className="createPostt"> Create a post </button>
               </Link> */}
        
      <div className="forumWidgets">
        {/* displaying the number of available posts */}
      <h3> Total Available Querries:  {listOfPostsNumber} </h3>
       {/* array printing the available post made using map method */}
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
              <div className="username">
               <Link to={`/profile/${value.UserId}`} style={{ color: 'blue'}}>
                {value.username}
                </Link>
                </div>
              <div className="buttons">
                <ThumbUpAltIcon  style={{ color: 'black'}}
                  onClick={() => {
                    likeAPost(value.id);
                  }}
                  className={
                    likedPosts.includes(value.id) ? "unlikeBttn" : "likeBttn"
                  }
                />

                <label style={{color: "black"}}> {value.Likes.length}</label>
              </div>
            </div>
          </div>
        );
      })}
    
        </div>
    </div>
  );
}
