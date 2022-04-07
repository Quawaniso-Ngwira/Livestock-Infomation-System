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

const TopbarSupplier = () => {
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
            
            
              <Link to="/supplier">
                <Tab label="Home" />
              </Link>
              <Link to="/supplierProducts">
                <Tab label="Add Product" />
              </Link>
              <Link to="/supplierMarket">
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

export default TopbarSupplier;
