import { React, useState } from 'react';
import './sidebar.css';
import { Home,
         LineStyle,
         TimelapseTwoTone,
         TrendingUp, 
         Feedback,
         Timeline,
         PermIdentity,
         Storefront,
         AttachMoney,
         BarChart,
         MailOutline,
         DynamicFeed,
         ChatBubbleOutline,
         WorkOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import {  useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router"; 

export default function Sidebar(){
      const[userId, setUserId] = useState();
      const [listOfBreeds, setListOfBreeds] = useState([]);

      useEffect(()=>{
            setUserId(localStorage.getItem("id"))
      }, [])

          useEffect(() => {
            axios.get(`http://localhost:3001/api/breeds/byuserId/${userId}`).then((response) => {
                  setListOfBreeds(response.data);
              });
          }, [userId]);
              console.log(userId)    
    return(
        <div className="sidebar">
          <div className="sidebarWrapper">
              <div className="sidebarMenu">
                  <ul className="sidebarList"> 
                  {/* <Link to="/" className="link">
                  <li className="sidebarListItem active">
                        <Home className="sidebarIcon"/>
                        Home
                  </li>
                  </Link>
                 
                  <Link to="/nutrition" className="link">
                  <li className="sidebarListItem">
                        <TrendingUp className="sidebarIcon"/>
                        Diseases
                  </li>
                  </Link> */}
                  {/* <Link to={`/production/${userId}`} className='link'>
                  <li className="sidebarListItem">
                        <DynamicFeed className="sidebarIcon"/>
                        Production
                  </li>
                  </Link> */}
             
                   <h3 className="sidebarTitle">Social Menu</h3>
                  <Link to="/forum" className="link">
                  <li className="sidebarListItem">
                        <Feedback className="sidebarIcon"/>
                         Forum
                  </li>
                  </Link>
                </ul>
              </div>
          </div>
     </div>
    );

}
