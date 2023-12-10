import "./Navbar.css";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { PAGES } from "../../pages/availablePages.js";
import { PAGES1 } from "../../pages/availablePages.js";
import getUserData from "../localStorage/localStorage";

const Navbar = ({handleLogOut}) => {
  const { user, isVote } = getUserData(); 
  const [isAdmin, setIsAdmin] = useState(false);
  
  useEffect(() => {
    const userData = getUserData();
    setIsAdmin(userData.isAdmin === 'true'); 
  }, []);

  const handleLinkClick = (pageName) => {
    if (pageName === 'LogOut') {
      localStorage.removeItem('id');
  localStorage.removeItem('user');
  localStorage.removeItem('isadmin');
      setIsAdmin(false); 
      handleLogOut()
    }
  };
  return (
    <nav className="navbar">
      <ul>
        {isAdmin ? PAGES.map(((pageName, index) => {
            return (
              <li key={index} >
                <NavLink to={`${pageName.url}`} onClick={()=>handleLinkClick(pageName.name)}>{pageName.name}</NavLink>
              </li>
            );
          })
        ): PAGES1.map(((pageName, index) => {
          return (
            <li key={index} onClick={()=>handleLinkClick(pageName.name)}>
              <NavLink to={`${pageName.url}`}>{pageName.name}</NavLink>
            </li>
          );
        })
      )}
        
      </ul>
      <h4> {isVote? `Thank you, ${user}, for your vote. the result will be soon!` :`Hello ${user},please make your vote!`}</h4>
      <h3>Vote For your favorite Food!</h3>
    </nav>
  );
};

export default Navbar;

