import React, { useEffect } from "react";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Outlet } from "react-router-dom";
import "./App.css";
import Voting from "./pages/Voting/Voting";
import Login from "./pages/Login/Login";
import Admin from "./pages/Admin/Admin";
import getUserData from "./component/localStorage/localStorage";
import AppNavBar from "./component/NavBar/AppNavBar";
import './index.css'
function App() {
  const { id } = getUserData();
  const [userId, setUserId] = useState(id);

  const handleLogin = (id) => {
    setUserId(id);
  };

  const handleLogOut = () => {
    setUserId(null);
  };
  useEffect(() => {}, [userId]);
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Login handleLogin={handleLogin} />} />
          <Route
            element={
              <>
                <AppNavBar handleLogOut={handleLogOut} />
                {/* <NavBar3 /> */}
                <Outlet />
              </>
            }
          >
            <Route
              
              path="/pages/Voting/Voting"
              element={<Voting userId={userId} />}
            />
            <Route  path="/pages/Admin/Admin" element={<Admin />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
