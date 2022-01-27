import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Download from '../../image/download.png';
import { AuthContext } from "../../helpers/AuthContext";
import { Link } from "react-router-dom"; 
import "./livestock.css";

function Livestock() {
  let { id } = useParams();
  const [postBreed, setBreedObject] = useState({});
  const [livestocks, setLivestocksObject] = useState([]);
  const { authState } = useContext(AuthContext);

 

  useEffect(() => {
    axios.get(`http://localhost:3001/api/breeds/byId/${id}`).then((response) => {
      setBreedObject(response.data);
      console.log(setBreedObject);
    });

    axios.get(`http://localhost:3001/api/livestock/${id}`).then((response) => {
      setLivestocksObject(response.data);
    });
  }, []);

  return (
    <div className="livestock">
  <div className="createLivestockContainer">
<Link to="/createlivestock">
<button className="createBreed"> Add {postBreed.breedName} </button>
</Link>
</div>
    <div className="livestockWidgets">
      <div className="displayInline">
      <h3>{postBreed.breedName} </h3>
    <img className="img" src={Download} alt="breed" style={{height: "45px", width: "45px"}}/>
    </div>
    </div>
    </div>
  );
}
export default Livestock;
