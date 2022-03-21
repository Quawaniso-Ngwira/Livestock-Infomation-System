import React, { useState, useContext, useEffect} from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import { styled } from '@mui/material/styles';
import R from '../image/IMG-20220120-WA0010.png';
import User from '../image/login.jpg';
import Input from '@mui/material/Input';
import { SearchOutlined } from '@material-ui/icons';
import Notifications from './Notifications';


function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthState } = useContext(AuthContext);
  const [notify, setNotify] = useState({isOpen: false, message:"", type:""})

  let navigate = useNavigate();

  
  const register = () => {
        navigate("/registration");
  };


  //function for the user to login upon clicking login button
  const login = () => {
    setNotify({
      isOpen:true,
      message: 'Submitted Suceessfully',
      type: 'success'
    })

    const data = { username: username, password: password };
    console.log(data);
    axios.post("https://serveriweta.herokuapp.com/auth/login", data).then((response) => {
      if (response.data.error) {
        alert(response.data.error);
      } else {
        localStorage.setItem("accessToken", response.data.token);
        localStorage.setItem("id", response.data.id);
        localStorage.setItem("role", response.data.role);
        setAuthState({
          username: response.data.username,
          id: response.data.id,
          status: true,
        });
        
        navigate("/")
        // const role=response.data.role;
        // // default login for user
        // if(role==="farmer"){
        //   navigate("/");
        // }
        //   // default login for supplier
        // if(role==="supplier"){
        //   navigate("/supplier");
        // }
        //   // default login for admin
        // if(role==="admin"){
        //   navigate("/admin");
        // }
        
      }
    });
  };
  return (
    //login page forms
   <div className="loginContainer"> 
        <h1>Login</h1>
        <img src={User} alt="login symbol" style={{ height: "70px", width: "70px"}} />
           <div className="loginContainer">
      <label>Username:</label>
      <input
        type="text"
        onChange={(event) => {
          setUsername(event.target.value);
        }}
      />
      <label>Password:</label>
      <input
        type="password"
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />

      <button onClick={login}> Login </button>
       {/* ********************************** * */}
       <Notifications
          notify={notify}
          setNotify={setNotify}
          />
 {/* *************************************       */}
      <button onClick={register}> Register </button>

      <Link to="/emailRecovery"><p className="RegisterStatement" style={{color: 'orangered'}}>Forget password? Click here to reset</p></Link>
    
     </div>
    </div>
    
  );
}

export default Login;