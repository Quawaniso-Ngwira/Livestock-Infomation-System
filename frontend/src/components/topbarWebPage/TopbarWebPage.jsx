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
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
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
                <Link to="/web">
                <Tab label="Home" />
                </Link>
                <Link to="/forumWeb">
                <Tab label="Forum" />
                </Link>
                <Link to="/aboutUs">
                <Tab label="About Us" />
              </Link> 
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
