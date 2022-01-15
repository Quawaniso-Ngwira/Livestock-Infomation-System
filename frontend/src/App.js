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
import { useState, useEffect } from "react";
import axios from "axios";
import Users from "./pages/users/Users";
import NewBreed from "./pages/newbreed/NewBreed";
import Sidebar from "./components/sidebar/Sidebar";
import { Outlet } from 'react-router-dom';
import Manage from "./pages/manage/Manage";


const SidebarLayout = () => (
  <>
    <Sidebar />
    <Outlet />
  </>
);

function App() {

  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
  });


  
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


  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("id");
    setAuthState({ username: "", id: 0, status: false });
    
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
             
              <Link to="/login">
              {authState.status && <PermIdentity onClick={logout} className="account"> </PermIdentity>}
              </Link>

              <h3>{authState.username} </h3>
              
           </div>
          </div>

        <div className="container">
       
       <Routes>
          <Route element={<SidebarLayout/>}>
              <Route index element={<Home/>} />
              <Route path="/chat" exact element={<Chat/>} />
              <Route path="/users" exact element={<Users/>} />
              <Route path="/production/:id" exact element={<Production/>} />
              <Route path="/forum" exact element={<Forum/>} />
              <Route path="/createpost" exact element={<CreatePost/>} />
              <Route path="/post/:id" exact element={<Post/>} />
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