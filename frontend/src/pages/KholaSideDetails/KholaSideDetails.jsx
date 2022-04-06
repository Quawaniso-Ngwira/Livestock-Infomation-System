import "./kholaSideDetails.css";
import "./kholaSideDetails.css";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"; 
import axios from "axios";
import { ArrowDownward, ArrowUpward, PermIdentity, DeleteOutline, EditOutlined, NoteAddIcon  } from "@material-ui/icons";


export default function KholaSideDetails() {

  const [postKhola, setKholaObject] = useState({});
  let navigate = useNavigate();

  useEffect(() => {
      var KholaId = localStorage.getItem('KholaId');
        axios.get(`http://localhost:3001/khola/ById/${KholaId}`).then((response) => {
          setKholaObject(response.data);
          console.log(response.data)
        });
      }, []);


//deleting the khola
const deleteKhola = () => {
var KholaId = localStorage.getItem('KholaId');
axios
  .delete(`http://localhost:3001/khola/delete/${KholaId}`, {
    headers: { accessToken: localStorage.getItem("accessToken") },
  })
  .then(() => {
    navigate("/kholaPage");
  });
};

//updating the khola info
const updateKhola = () => {
  navigate("/upDateKhola");
};

  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">{postKhola.KholaName} Khola</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney"> <EditOutlined  onClick={updateKhola} variant="contained" color="primary" style={{cursor: "pointer"}}/></span>
          <span className="featuredMoney">
          &nbsp;&nbsp;&nbsp; <DeleteOutline onClick={deleteKhola} variant="contained" color="primary" style={{cursor: "pointer"}}/>
          </span>
        </div>
        <span className="featuredSub">Created on {postKhola.createdAt}</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Available {postKhola.AnimalType}(s)</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{postKhola.Number}</span>
        </div>
        <span className="featuredSub">{postKhola.Breed}</span>
      </div>
    
      <div className="featuredItem">
      <Link to="/dairyRecording">
        <span className="featuredTitle">Dairy Recordings</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney"></span>
          <span className="featuredMoneyRate">
            +2.4 <ArrowUpward className="featuredIcon"/>
          </span>
        </div>
        <span className="featuredSub">Stay updated record your notes by clicking here</span>
        </Link>
      </div>
   
    </div>
  );
}
