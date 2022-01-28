import React, { useContext } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link, } from "react-router-dom";
import {  PermIdentity, NotificationsActiveOutlined } from "@material-ui/icons";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";
import Registration from "./pages/Registration";
import EmailRecovery from "./pages/EmailRecovery";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import Chat from "./pages/chat/Chat";
import Production from "./pages/production/Production";
import Forum from "./pages/forum/Forum";
import Profile from "./pages/Profile"; 
import { AuthContext } from "./helpers/AuthContext";
import Livestock from "./pages/livestock/Livestock";
import { useState, useEffect } from "react";
import axios from "axios";
import Users from "./pages/users/Users";
import NewBreed from "./pages/newbreed/NewBreed";
import RegisterLivestock from "./pages/registerLivestock/RegisterLivestock";
import Sidebar from "./components/sidebar/Sidebar";
import { Outlet } from 'react-router-dom';
import Manage from "./pages/manage/Manage";
import { styled, Box } from '@mui/system';
import ModalUnstyled from '@mui/base/ModalUnstyled';


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
  width: 90,
  bgcolor: 'whitesmoke',
 // bgcolor: 'background.paper',
  border: '2px solid blue',
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
      .get("http://localhost:3001/auth/auth", {
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
    
  };

  return (

    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <div className="navbar">
            <div className="links">
            {!authState.status ? (
                <> 
                  <Link to="/login"><h2> LIS </h2></Link>
                  
                </>
              ) : (
                <>
                  <Link to="/"> <h2> LIS</h2> </Link>
               
                </>
              )}
            </div>
           
            <div className="loggedInContainer">
             
            {authState.status && <NotificationsActiveOutlined className="account"> </NotificationsActiveOutlined>}
             
            
            {authState.status && <PermIdentity onClick={handleOpen} className="account"> </PermIdentity>}
            <StyledModal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={open}
        onClose={handleClose}
        BackdropComponent={Backdrop}>
        <Box sx={style}>
        <PermIdentity style={{color: "blue", width: "60px", height: "40px"}}> </PermIdentity> 
        <Link to="/login">
      
       <h3 onClick={logout} style={{color: "orange"}}>Logout</h3>
       </Link>
      
       <h3>Profile</h3>
        </Box>
      </StyledModal>

              <h3>{authState.username} </h3>
              
           </div>
          </div>

        <div className="container">
       
       <Routes>
          <Route element={<SidebarLayout/>}>
              <Route index element={<Home/>} />
              <Route path="/chat" exact element={<Chat/>} />
              <Route path="/users" exact element={<Users/>} />
              <Route path="/production/:id" exact element={<Production/>}  />
              <Route path="/forum" exact element={<Forum/>} />
              <Route path="/createpost" exact element={<CreatePost/>} />
              <Route path="/post/:id" exact element={<Post/>}/>
              <Route path="/livestock/:id" exact element={<Livestock/>}/>
              <Route path="/createlivestock" exact element={<RegisterLivestock/>} />
              <Route path="/manage" exact element={<Manage/>} />
              <Route path="/createbreed" exact element={<NewBreed/>} />
              <Route path="/profile/:id" exact element={<Profile/>} />
              <Route path="*" exact element={<PageNotFound/>} />
          </Route>
          <Route path="/registration" exact element={<Registration/>} />
          <Route path="/login" exact element={<Login/>} />
          <Route path="/emailRecovery" exact element={<EmailRecovery/>} />
       </Routes>
       </div>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;