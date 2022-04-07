import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./orderProduct.css";


export default function OrderProduct() {
    const [product, setProductObject] = useState({});
    let navigate = useNavigate();
 
  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate( "/home");
     
    }
  }, []);

  
  useEffect(() => {
    var OrderId = localStorage.getItem('orderId');
      axios.get(`https://serveriweta.herokuapp.com/product/byId/${OrderId}`).then((response) => {
        setProductObject(response.data);
        console.log(response.data)
      });
    }, []);


  
 return(
   <>
    <div  className="cards__order">
    <div className="card__title" >{product.Name}</div>
    <div className="card__body">
      
     <p className="breedname"> {product.Description} </p>
     <p className="breedname"> {product.Category} </p>
     <p className="breedname">MK: {product.Price} </p>
     <hr/>
      </div>
   </div>
  
{/* //    break here */}
<div  className="cards__order__two">
<div className="card__title" >
<div className="breeedcategory">
  <div className="arrange"><div className="split">
 <h3 className="breedname"> Order Item </h3>
  </div>
  
  </div> </div>
</div>
</div>
</>
 );
   
 
}
