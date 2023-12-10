import React from "react";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import getUserData from "../localStorage/localStorage";
import { useState, useEffect } from "react";
import '../NavBar1/NavBar1.css'
const NavBar1 = () => {
    const { user, isVote } = getUserData(); 
    const [isAdmin, setIsAdmin] = useState(false);
    

    
    useEffect(() => {
      const userData = getUserData();
      setIsAdmin(userData.isAdmin === 'true'); 
    }, [isVote]);
  
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
  
  
  <Navbar expand="lg" className="bg-body-tertiary">
  <Container fluid>
    <Navbar.Brand href="#">Vote For your Vaforite Food!</Navbar.Brand>
    <Navbar.Toggle aria-controls="navbarScroll" />
    <Navbar.Collapse id="navbarScroll">
      <Nav
        className="me-auto my-2 my-lg-0"
        style={{ maxHeight: '100px' }}
        navbarScroll
      > 
        <NavDropdown title={user} id="navbarScrollingDropdown">
          <NavDropdown.Item href="/" onClick={handleLinkClick}>LogOut</NavDropdown.Item>
          <NavDropdown.Item href="/pages/Voting/Voting">
            Votes
          </NavDropdown.Item>
          <NavDropdown.Divider />
         {isAdmin ? <NavDropdown.Item href={'/pages/Admin/Admin'}>
          Admin  
          </NavDropdown.Item>: null} 
        </NavDropdown>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
);
};

export default NavBar1;
