import React, { useState } from "react";
import {
  AppBar,
  Button,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {  Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import DrawerComp from './Drawer';

const Topbar = () => {
   const navigate = useNavigate();
  const [value, setValue] = useState();
  const theme = useTheme();
  console.log(theme);
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  console.log(isMatch);

const Home = () =>{
    navigate("/");
};
const Khola = () =>{
  navigate("/kholaPage");
};
const Forum = () =>{
  navigate("/forum");
};
const Market = () =>{
  navigate("/market");
};

  return (
    <React.Fragment>
      <AppBar sx={{ background: "#046904", marginTop:"65px" }}>
        <Toolbar>
          {isMatch ? (
            <>
              <Typography sx={{ fontSize: "2rem", paddingLeft: "10%" }}>
                iWeta
              </Typography>
              <DrawerComp />
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
            
                <Tab label="Home" onClick={Home} />
                <Tab label="My Khola" onClick={Khola} />
                <Tab label="Forum" onClick={Forum}/>
                <Tab label="Market" onClick={Market} /> 
              </Tabs>
           
            </>
          )}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default Topbar;
