import "./production.css";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router"; 
import { Link } from "react-router-dom"; 
import axios from "axios";
import breedcategory from "../../image/breedtype.png";

export default function Production() {
  let { id } = useParams();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [listOfBreeds, setListOfBreeds] = useState([]);

  useEffect(() => { 
    axios.get(`http://localhost:3001/auth/basicinfo/${id}`).then((response) => {
      setUsername(response.data.username);
  });
    axios.get(`http://localhost:3001/api/breeds/byuserId/${id}`).then((response) => {
        setListOfBreeds(response.data);
    });
}, []);


console.log(id)
return <div className="production">
<div className="basicInfo">
  <div className="createBreedContainer">
<Link to="/createbreed">
<button className="createBreed"> Register Breed </button>
</Link>
</div>

    { " "}
     <h2 style={{color: "blue", padding: "20px"}}>This is livestock owned by {username}  </h2>
     </div>

<div className="productionWidgets">

{listOfBreeds.map((value, key) => {
  return (
       <div key={key} className="postbreed">
            <div className="title" >
            Breed Category:
            <div className="breeedcategory">
            <img src={breedcategory} alt="breed category" style={{ height: "50px", width: "50px"}} />
                <h3>{value.breedName} </h3> </div>
           </div>
            <div
              className="body"
              onClick={() => {
               navigate(`/post/${value.id}`);
              }}
            >
              
            </div>
            
          </div>
        );
      })}

        </div>
    </div>

}
