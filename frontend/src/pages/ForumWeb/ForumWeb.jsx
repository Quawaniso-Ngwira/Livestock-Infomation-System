import "./forumWeb.css";
import React, { useContext } from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import CommentIcon from "@material-ui/icons/Comment";
import { AuthContext } from "../../helpers/AuthContext";
import {  Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import {  TextField, IconButton } from '@material-ui/core';
import { SearchOutlined } from '@material-ui/icons';
 
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

export default function ForumWeb() {
  const [searchTitle, setSearchTitle] = useState("");
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
  
      axios
        .get("http://localhost:3001/posts")
        .then((response) => {
          setListOfPosts(response.data.listOfPosts);
          setLikedPosts(
            response.data.likedPosts.map((like) => {
              return like.PostId;
            })
          );
        });
  
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

 <TextField style={{margin: "10px", backgroundColor: "#fafafa"}}
          onChange={(e) => setSearchTitle(e.target.value)}
               
                id="standard-bare"
                variant="outlined"
                placeholder="(Search Product)"
                InputProps={{
                  endAdornment: (
                    <IconButton>
                      <SearchOutlined />
                    </IconButton>
                  ),
                }}
              />
    <hr/>
      <div className="forumWidgets">
        {/* displaying the number of available posts */}
      <h3> Other peoples Querries:  {listOfPostsNumber} </h3>
       {/* array printing the available post made using map method */}
    {listOfPosts.filter((value) => {
           if (searchTitle === "") {
             return value;
           } else if (
             value.title?.toLowerCase().includes(searchTitle.toLowerCase())
           ) {
             return value;
           }
         }).map((value, key) => {
        return (
          <div key={key}  className="post">
            <div className="title"> {value.title} </div>
            <div
              className="body"
              onClick={() => {
               navigate(`/postWeb/${value.id}`);
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
