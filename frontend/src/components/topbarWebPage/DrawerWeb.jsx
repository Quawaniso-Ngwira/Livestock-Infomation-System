import React, { useState } from "react";
import {
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Menu } from "@material-ui/icons";
import { Link } from "react-router-dom"; 
// const pages = ["Products", "Services", "ABoutUs", "ContactUs"];
const DrawerWeb = () => {
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <React.Fragment>
      <Drawer
        anchor="left"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <List>
          {/* {pages.map((page, index) => (
            <ListItemButton key={index}>
              <ListItemIcon>
                <ListItemText>{page}</ListItemText>
              </ListItemIcon>
            </ListItemButton>
          ))} */}
          <Link to="web">
            <ListItemButton >
              <ListItemIcon>
                <ListItemText>Home</ListItemText>
              </ListItemIcon>
            </ListItemButton>
          </Link>
          <Link to="/graphs">
            <ListItemButton >
              <ListItemIcon>
                <ListItemText>Graphs</ListItemText>
              </ListItemIcon>
            </ListItemButton>
            </Link>
            <Link to="forumWeb">
            <ListItemButton >
              <ListItemIcon>
                <ListItemText>Forum</ListItemText>
              </ListItemIcon>
            </ListItemButton>
            </Link>
            <Link to="aboutUs">
            <ListItemButton >
              <ListItemIcon>
                <ListItemText>About Us</ListItemText>
              </ListItemIcon>
            </ListItemButton>
            </Link>
        </List>
      </Drawer>
      <IconButton
        sx={{ color: "white", marginLeft: "auto" }}
        onClick={() => setOpenDrawer(!openDrawer)}
      >
        <Menu color="white" />
      </IconButton>
    </React.Fragment>
  );
};

export default DrawerWeb;
