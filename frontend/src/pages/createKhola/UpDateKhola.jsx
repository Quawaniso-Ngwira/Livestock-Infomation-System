import { useNavigate, Link, useParams  } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../helpers/AuthContext";
import './createKhola.css';

function UpDateKhola() {
  let { id } = useParams();
  const [ KholaName, setKholaNameEdit] = useState('');
  const [ Location, setLocation] = useState('');
  const [AnimalType, setAnimalType] = useState('');
  const [ Breed, setBreed] = useState('');
  const [ Number, setNumber] = useState(0);
  const { authState } = useContext(AuthContext);


  let navigate = useNavigate();

  
  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate( "/home");
     
    }
  }, []);
 //for identifying the khola details
 useEffect(() => {
  var KholaId = localStorage.getItem('KholaId');
   axios.get(`http://localhost:3001/khola/ById/${KholaId}`).then((response) => {
      // console.log(response.data.KholaName);
      setKholaNameEdit(response.data.KholaName);
      // console.log(response.data.Location);
      setLocation(response.data.Location);
      // console.log(response.data.AnimalType);
      setAnimalType(response.data.AnimalType);
      setBreed(response.data.Breed);
      // console.log(response.data.Number);
      setNumber(response.data.Number);
    });
  }, []);


    
//updating the khola info
const updateKhola = () => {
  // data to be updated crucial
const data = {
  KholaName: KholaName,
  Location: Location,
  AnimalType: AnimalType,
  Breed: Breed,
  Number: Number
}

  var KholaId = localStorage.getItem('KholaId');
  axios
    .put(`http://localhost:3001/khola/update/${KholaId}`, data)
    .then(() => {
      navigate("/specificKhola");
    });
};


  return (
    //login page forms
   <div className="loginContainer"> 
        <h1>Update Khola</h1>
        
           <div className="loginContainer">
      <label>KholaName:</label>
      <input
        type="text"
        value={KholaName}
        onChange={(e)=>{setKholaNameEdit(e.target.value)}}
      />
      <label>Location:</label>
      <input
        type="text"
        value={Location}
        onChange={(e)=>{setLocation(e.target.value)}}
      />
      <label>Animal Type:</label>
      <input
        type="text"
        value={AnimalType}
        onChange={(e)=>{setAnimalType(e.target.value)}}
      />
      <label>Breed:</label>
      <input
        type="text"
        value={Breed}
        onChange={(e)=>{setBreed(e.target.value)}}
      />

<label>Number :</label>
      <input
        type="number"
        value={Number}
            onChange={(e)=>{setNumber(e.target.value)}}
      />
      <button onClick={updateKhola} style={{cursor: "pointer"}}> Update Khola</button>
     </div>
    </div>
    
  );
}

export default UpDateKhola;