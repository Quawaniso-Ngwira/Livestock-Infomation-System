import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {  TextField, IconButton } from '@material-ui/core';
import { SearchOutlined } from '@material-ui/icons';
import axios from "axios";
import "./dairyRecordings.css";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';



export default function DairyRecordings() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const [product, setProductObject] = useState({});
    const [listOfPosts, setListOfPosts] = useState([]);
    const [likedPosts, setLikedPosts] = useState([]);
    const [makolaById, setMakolaById] = useState([]);
    const [searchTitle, setSearchTitle] = useState("");
    let navigate = useNavigate();

 
  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate( "/home");
     
    }
  }, []);

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


  
  useEffect(() => {
    var OrderId = localStorage.getItem('orderId');
      axios.get(`http://localhost:3001/product/byId/${OrderId}`).then((response) => {
        setProductObject(response.data);
        console.log(response.data)
      });
    }, []);

    
  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    } else {
     console.log("")
    }
  }, []);

   ///khola/ByUserId/
   useEffect(() => { 
    var id = localStorage.getItem('id');
      axios.get(`http://localhost:3001/khola/ByUserId/${id}`).then((response) => {
          console.log(response.data);
         setMakolaById(response.data);
          
      });
  }, []);
  

 return(
    <>
    
    
    <div  className="cards__order__">
    <div className="card__title" >{product.Name}</div>
    <hr/>
    <div className="card__body"> 
     <p className="breedname"> {product.Description} </p>
     <p className="breedname"> {product.Category} </p>
     <p className="breedname">MK: {product.Price} </p>
      </div>
   </div>
  
{/* //    break here */}
<div  className="cards__order__two__">
<div className="card__title" ><div> {product.Name} Schedules</div><div>       <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Add Activity
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add activity</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe add activity, please fill the form here.
          </DialogContentText>
         
           <TextField
            autoFocus
            margin="dense"
            id="name"
            type="date"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Activity"
            type="text"
            fullWidth
          />
           <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Desease"
            type="text"
            fullWidth
          />
           <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Affected"
            type="text"
            fullWidth
          />
           <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Cost"
            type="number"
            fullWidth
          />
           <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Comment"
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
</div></div>
<div className="card__body">
 <p className="breedname"> 
 {listOfPosts.map((value, key) => {
        return (
          <div key={key} className="post">
            <div className="title"> {value.title} </div>
            <div >
              {/* {value.postText} */}
            </div>
            </div>
      
        );
      })}
  </p>

  </div>
</div>
</>
 );
   
 
}
