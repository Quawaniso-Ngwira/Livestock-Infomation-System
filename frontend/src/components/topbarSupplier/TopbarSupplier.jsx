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
import DrawerSup from './DrawerSupplier';
import { useNavigate } from "react-router-dom";

const TopbarSupplier = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState();
  const theme = useTheme();
  console.log(theme);
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  console.log(isMatch);

  const Forum = () =>{
    navigate("/supplier");
  };
  const Web = () =>{
    navigate("/supplierProducts");
  };
  const About = () =>{
    navigate("/supplierMarket");
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
              <DrawerSup />
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
            
                <Tab label="Home" onClick={Forum}/>
                <Tab label="Add Product" onClick={Web}/>
                <Tab label="Market" onClick={About}/>
             
              </Tabs>
           
            </>
          )}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default TopbarSupplier;
