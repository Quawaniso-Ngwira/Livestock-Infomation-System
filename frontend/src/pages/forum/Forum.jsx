import "./forum.css";
import React, { useContext } from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import CommentIcon from "@material-ui/icons/Comment";
import { AuthContext } from "../../helpers/AuthContext";
import {  Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
 
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    textAlign: 'right',
  },
  paper: {
    padding: theme.spacing(1),
    // textAlign: 'right',
    color: theme.palette.text.primary,
  },
}));

export default function Forum() {
  const classes = useStyles();
  var numberOfComments = localStorage.getItem("numberOfComments");
  const [listOfPosts, setListOfPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const { authState } = useContext(AuthContext);
  const [socket, setSocket] = useState(null); 
  const  [user, setUser] = useState("")
  const listOfPostsNumber = listOfPosts.length
  let navigate = useNavigate();


  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    } else {
      axios
        .get("https://serveriweta.herokuapp.com/posts/All", {
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
        "https://serveriweta.herokuapp.com/likes",
        { PostId: postId },
        { headers: { accessToken: localStorage.getItem("accessToken") } }
      )
      .then((response) => {
        setListOfPosts(
          listOfPosts.map((post) => {
            if (post.id === postId) {
              if (response.data.liked) {
                return { ...post, Likes: [...post.Likes, 0] };
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
 <br/>

<div className={classes.root}>
          <Link to="/createpost">  
          <Button variant="outlined" color="primary">
       Add Post
      </Button> 
      </Link> 
    </div>
    <hr/>

        
      <div className="forumWidgets">
        {/* displaying the number of available posts */}
       {/* array printing the available post made using map method */}
    {listOfPosts.map((value, key) => {
        return (
          <div key={key} socket={socket} user={user} className="post">
            <div className="title"> {value.title} </div>
            <div
              className="body"
              onClick={() => {
               navigate(`/post/${value.id}`);
               localStorage.setItem("PostId", JSON.stringify(value.id))
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
              <CommentIcon  style={{ color: 'black'}}/>
              <label style={{color: "black"}}> {numberOfComments}</label>
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
