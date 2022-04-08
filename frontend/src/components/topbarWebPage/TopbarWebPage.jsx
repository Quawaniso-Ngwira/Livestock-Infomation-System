import React, { useState } from "react";
import {
  AppBar,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Button from '@material-ui/core/Button';
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {  Link } from "react-router-dom";
import DrawerWeb from "./DrawerWeb";

const TopbarWebPage= () => {
  const navigate = useNavigate();
  const [value, setValue] = useState();
  const theme = useTheme();
  console.log(theme);
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  console.log(isMatch);

  const Forum = () =>{
    navigate("/forumWeb");
  };
  const Web = () =>{
    navigate("/web");
  };
  const About = () =>{
    navigate("/aboutUs");
  };

  return (
    <React.Fragment>
      <AppBar sx={{ background: "#046904", marginTop:"65px" }}>
        <Toolbar>
    
          {isMatch ? (
            <>
              <Typography sx={{ fontSize: "2rem", paddingLeft: "10%" }}>
                iWeta Website
              </Typography>
              <DrawerWeb />
            </>
          ) : (
            <>
              <Tabs
                sx={{ flexGrow: 1 }}
                indicatorColor="secondary"
                textColor="inherit"
                value={value}
                onChange={(e, value) => setValue(value)}
                centered
              >
                
                <Tab label="Home" onClick={Web} />
                <Tab label="Forum" onClick={Forum}/>
                <Tab label="About Us" onClick={About}/>
          
              </Tabs>
              <Link to="/login">
              <Button sx={{ marginLeft: "auto" }} variant="contained" color="white" startIcon={<AccountCircleIcon/>}>
                SIGN IN
              </Button>
              </Link>
              {/* <Link to="/registration">
              <Button sx={{ marginLeft: "10px" }} variant="contained">
                SignUp
              </Button>
              </Link> */}
            </>
          )}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default TopbarWebPage;
