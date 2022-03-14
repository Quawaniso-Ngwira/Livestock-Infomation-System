import React, { useContext } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link, Navigate, } from "react-router-dom";
import {  PermIdentity, NotificationsNone, PowerSettingsNewOutlined } from "@material-ui/icons";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";
import Registration from "./pages/Registration";
import EmailRecovery from "./pages/EmailRecovery";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import Production from "./pages/production/Production";
import Forum from "./pages/forum/Forum";
import Profile from "./pages/Profile"; 
import { AuthContext } from "./helpers/AuthContext";
import Livestock from "./pages/livestock/Livestock";
import SpecificKhola from "./pages/specificKhola/SpecificKhola";
import { useState, useEffect } from "react";
import axios from "axios";
import Nutrition from "./pages/nutrition/Nutrition";
import NewBreed from "./pages/newbreed/NewBreed";
import RegisterLivestock from "./pages/registerLivestock/RegisterLivestock";
import Sidebar from "./components/sidebar/Sidebar";
import { Outlet } from 'react-router-dom';
import { styled, Box } from '@mui/system';
import ModalUnstyled from '@mui/base/ModalUnstyled';
import R from './image/IMG-20220120-WA0010.png';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CreateKhola from "./pages/createKhola/CreateKhola";
import UpDateKhola from "./pages/createKhola/UpDateKhola";
import KholaPage from "./pages/KholaPage/KholaPage";


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));


const StyledModal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0.7;
  top: 0;
  left: 0.71;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Backdrop = styled('div')`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const style = {
  width: 120,
  bgcolor: 'whitesmoke',
  borderRadius: 5,
 // bgcolor: 'background.paper',
  //border: '2px solid blue',

  margin: 1,
  p: 2,
  px: 4,
  pb: 3,
};


const SidebarLayout = () => (
  <>
    <Sidebar />
    <Outlet />
  </>
);

function App() {
  //assigning classes to the method useStyles()
  const classes = useStyles();

   // for the register livestock modal
   const [open, setOpen] = React.useState(false);
   const handleOpen = () => setOpen(true);
   const handleClose = () => setOpen(false);
  

  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
  });
  

//persist state after refreshing the page
  useEffect(()=> {
  const data = localStorage.getItem('maintain-logged-in-state');
  if(data) {
    setAuthState(JSON.parse(data));
  }
  },[]);

useEffect(()=> {
  localStorage.setItem("maintain-logged-in-state", JSON.stringify(authState));
});

// verify that the user has a valid token and is aunthticated
  useEffect(() => {
    axios
      .get("http://localhost:3001/auth/login", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState({ ...authState, status: false });
        } else {
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            status: true,
          });
        }
      });
    
  }, []);

//logout function 
  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("id");
    setAuthState({ username: "", id: 0, status: false });
    handleClose() 
    localStorage.removeItem("listOfKholaNumber");
  };

  const profile = () => {
    handleClose() 
  };
  
  
  return (
   
    <div className="App">
     
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
      
          <div className="navbar">
            <div className="links">
            {!authState.status ? (
                <> 
                  <Link to="/login"><h2 style={{color:"black"}}> iWeta </h2></Link>
                  
                </>
              ) : (
                <>
                
          <img src={R} alt="livestock pic" style={{ height: "80px", width: "120px"}} className=""/>
                  <Link to="/"> <h2 style={{color: "black"}}> iWeta</h2> </Link>
               
                </>
              )}
            </div>
           
            <div className="loggedInContainer">
            <h3 style={{color: "black", padding: "15px"}}> {authState.username} </h3>
            <></>
            {authState.status && <div className="topbarIconContainer">
                        <NotificationsNone/>
                        <span className="topIconBadge">6</span>
                    </div>}
            <></>
            {authState.status && <Button variant="contained" onClick={handleOpen}  className={classes.root}> Logout </Button>}
            <StyledModal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={open}
        onClose={handleClose}
        BackdropComponent={Backdrop}>
        <Box sx={style}>
        {/* <PermIdentity style={{color: "blue", width: "60px", height: "40px"}}> </PermIdentity>  */}
        <Link to="/login">
      
       <p onClick={logout} style={{color: "blue",display: "flex", margin: "4"}}><PowerSettingsNewOutlined/>Logout</p>
       </Link>
       
      <Link to="/profile">
       <p onClick={profile} style={{color: "blue", display: "flex"}}><PermIdentity />Profile</p>
       </Link>
        
        </Box>
      </StyledModal>

      {/* <h3>{authState.username} </h3> */}
      </div> 
           </div>
        

          {!authState.status ? (
                <> 
                 
                  
                </>
              ) : (
                <>
                <div style={{backgroundColor: "#1C321C"}}>
       <div className="inlineNav">
         <Link to="/">
         <div><h4>HOME</h4></div>
         </Link>
         <Link to="/kholaPage">
         <div><h4>MY KHOLA</h4></div>
         </Link>
         <Link to="/nutrition">
         <div><h4>PIG</h4></div>
         </Link>
         <div><h4>CATTLE</h4></div>
         <div><h4>ABOUT US</h4></div>
       </div>
       </div>
  
                </>
              )}
     
      
        
        <div className="container">
       <Routes>
          <Route element={<SidebarLayout/>}>
              <Route path="/nutrition" exact element={<Nutrition/>} />
              <Route path="/production/:id" exact element={<Production/>}  />
              <Route path="/forum" exact element={<Forum/>} />
              <Route path="/createpost" exact element={<CreatePost/>} />
              <Route path="/post/:id" exact element={<Post/>}/>
              <Route path="/livestock/:id" exact element={<Livestock/>}/>
              <Route path="/createlivestock" exact element={<RegisterLivestock/>} />
              <Route path="/createbreed" exact element={<NewBreed/>} />
              <Route path="*" exact element={<PageNotFound/>} />
          </Route>
           <Route index element={<Home/>} />
          <Route path="/registration" exact element={<Registration/>} />
          <Route path="/login" exact element={<Login/>} />
          <Route path="/profile" exact element={<Profile/>} />
          <Route path="/kholaPage" exact element={<KholaPage/>} />
          <Route path="/emailRecovery" exact element={<EmailRecovery/>} />
          <Route path="/createKhola" exact element={<CreateKhola/>} />
          <Route path="/upDateKhola" exact element={<UpDateKhola/>} />
          <Route path="/specificKhola" exact element={<SpecificKhola/>} />
       </Routes>
       </div>
        </Router>
      </AuthContext.Provider>
    </div>
   
  );
}

export default App;