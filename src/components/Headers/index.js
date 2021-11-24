import React, { useEffect, useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import jwt from "jsonwebtoken";
import { useNavigate } from "react-router-dom";
/**
 * @author
 * @function Header
 **/

const Header = (props) => {
  const navigate = useNavigate();
  const [authenticate, setAuthenticate] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    console.log(token);
    if (token) {
      const user = jwt.decode(token);
      if (!user) {
        sessionStorage.removeItem("token");
        navigate("/login");
      } else {
        setAuthenticate(true);
      }
    }
  }, []);

  const Signout = () => {
    sessionStorage.removeItem("token");
    navigate("/login");
  };

  const renderLoggedInLinks = () => {
    return (
      <Nav>
        <li className="nav-item">
          <span
            style={{ cursor: "pointer" }}
            className="nav-link"
            onClick={() => {
              sessionStorage.removeItem("token");
              navigate("/login");
            }}
          >
            Signout
          </span>
        </li>
      </Nav>
    );
  };

  const renderNonLoggedInLinks = () => {
    return (
      <Nav>
        {/* <Nav.Link href="#deets">Signin</Nav.Link> */}
        <li className="nav-item">
          <NavLink to="/login" className="nav-link">
            Login
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/register" className="nav-link">
            Register
          </NavLink>
        </li>
      </Nav>
    );
  };

  return (
    <Navbar
      collapseOnSelect
      fixed="top"
      expand="lg"
      bg="dark"
      variant="dark"
      style={{ zIndex: 1 }}
    >
      <Container fluid>
        {/* <Navbar.Brand href="#home">Admin Dashboard</Navbar.Brand> */}
        <Link to="/" className="navbar-brand">
          Dashboard
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto"></Nav>
          {authenticate ? renderLoggedInLinks() : renderNonLoggedInLinks()}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
