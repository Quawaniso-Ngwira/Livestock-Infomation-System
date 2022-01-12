import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import R from '../image/R.jpg';
import User from '../image/login.jpg'

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  height: '75%',
  color: theme.palette.text.secondary,
}));


function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthState } = useContext(AuthContext);

  let navigate = useNavigate();

  
  const register = () => {
        navigate("/registration");
  };

  const login = () => {
    const data = { username: username, password: password };
    axios.post("http://localhost:3001/auth/login", data).then((response) => {
      if (response.data.error) {
        alert(response.data.error);
      } else {
        localStorage.setItem("accessToken", response.data.token);
        localStorage.setItem("id", response.data.id);
        setAuthState({
          username: response.data.username,
          id: response.data.id,
          status: true,
        });
        navigate("/");
      }
    });
  };
  return (
    //login page forms
    <Box sx={{ width: '100%' }}>
    <Grid container rowSpacing={10} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      <Grid item xs={4}>
        <Item>
          <img src={R} alt="livestock pic" style={{ height: "60%", width: "100%"}} className=""/>
            </Item>
      </Grid>
      <Grid item xs={8}>
        <Item>
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
      <button onClick={register}> Register </button>

      <Link to="/emailRecovery"><p className="RegisterStatement" style={{color: 'orangered'}}>Forget password? Click here to reset</p></Link>
    </div>
    </Item>
      </Grid>
    </Grid>
  </Box>
   
  );
}

export default Login;