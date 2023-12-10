import React from "react";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import getUserData from "../localStorage/localStorage";
import { useState, useEffect } from "react";
import './AppNavBar.css'
import { FaUserCircle } from "react-icons/fa";
import { NavLink } from "react-router-dom";


const AppNavBar = () => {
  const { user, isVote } = getUserData();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const userData = getUserData();
    setIsAdmin(userData.isAdmin === "true");
  }, [isVote]);

  const handleLinkClick = (pageName) => {
    if (pageName === "LogOut") {
      localStorage.removeItem("id");
      localStorage.removeItem("user");
      localStorage.removeItem("isadmin");
      setIsAdmin(false);
      handleLogOut();
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
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <NavDropdown
              title={
                <span>
                  <FaUserCircle /> {user}
                </span>
              }
              id="navbarScrollingDropdown"
            >
            <NavLink to={'/'}  ><NavDropdown.Item href="/" onClick={handleLinkClick}>
                LogOut
              </NavDropdown.Item></NavLink>
              <NavLink to="/pages/Voting/Voting"><NavDropdown.Item href="/pages/Voting/Voting">
                Votes
              </NavDropdown.Item></NavLink>
              <NavDropdown.Divider />
              {isAdmin ? (
               <NavLink to='/pages/Admin/Admin'> <NavDropdown.Item href={"/pages/Admin/Admin"}>
               Admin
             </NavDropdown.Item></NavLink>
              ) : null}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Offcanvas
              id={`offcanvasNavbar-expand`}
              aria-labelledby={`offcanvasNavbarLabel-expand`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand`}>
                Vote For your Vaforite Food!
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link href="/">LogOut</Nav.Link>
                  <Nav.Link href="/pages/Voting/Voting">votes</Nav.Link>
                  {isAdmin ? <Nav.Link href="/pages/Admin/Admin">Admin</Nav.Link> :null }
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default AppNavBar;
