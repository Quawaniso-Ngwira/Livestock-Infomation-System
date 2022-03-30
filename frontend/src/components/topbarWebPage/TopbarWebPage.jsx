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
import DrawerWeb from "./DrawerWeb";
const TopbarWebPage= () => {
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
           
                <Tab label="Home" />
                <Tab label="Graphs" />
                <Link to="/forumWeb">
                <Tab label="Forum" />
                </Link>
                <Link to="/aboutUs">
                <Tab label="AboutUs" />
              </Link> 
              </Tabs>
              <Link to="/login">
              <Button sx={{ marginLeft: "auto" }} variant="contained">
                Login
              </Button>
              </Link>
              <Link to="/registration">
              <Button sx={{ marginLeft: "10px" }} variant="contained">
                SignUp
              </Button>
              </Link>
            </>
          )}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default TopbarWebPage;
