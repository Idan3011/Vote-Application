import React, { useEffect } from "react";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./component/Navbar/Navbar";
import Voting from "./pages/Voting/Voting";
import Login from "./pages/Login/Login";
import Admin from "./pages/Admin/Admin";
import getUserData from "./component/localStorage/localStorage";

function App() {
  const { id } = getUserData(); 
  const [userId, setUserId] = useState(id)


const handleLogin =(id)=>{
  setUserId(id)
}

 const handleLogOut = ()=>{
  setUserId(null)
 }
 useEffect(()=>{
  
 },[userId])
  return (
    <div className="App">
      
      <Router>
        <Routes>
        <Route exact path="/"  element={<Login handleLogin={handleLogin}/>}/>
        <Route
          element={
            <>
              <Navbar handleLogOut={handleLogOut}/>
              <Outlet />
            </>
          }
        >
          <Route exact path="/pages/Voting/Voting" element={<Voting  userId={userId}/>} />
          <Route exact path="/pages/Admin/Admin" element={<Admin />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
