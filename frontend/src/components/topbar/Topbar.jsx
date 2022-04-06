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
import DrawerComp from './Drawer';

const Topbar = () => {
  const [value, setValue] = useState();
  const theme = useTheme();
  console.log(theme);
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  console.log(isMatch);

  return (
    <React.Fragment>
      <AppBar sx={{ background: "#063970", marginTop:"65px" }}>
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
            
              <Link to="/">
                <Tab label="Home" />
              </Link>
              <Link to="/kholaPage">
                <Tab label="My Khola" />
              </Link>
              <Link to="/nutrition">
                <Tab label="Manage" />
              </Link>
              <Link to="/market">
                <Tab label="Market" />
              </Link> 
              </Tabs>
           
            </>
          )}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default Topbar;
