import React from "react";
import { AuthService, logout} from "../services";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";

const NavBar = () => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>Stocks</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        {AuthService() && (
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto float-end">
              <Button className="me-auto float-end" onClick={(e) => logout()}>
                Logout
              </Button>
            </Nav>
          </Navbar.Collapse>
        )}
      </Container>
    </Navbar>
  );
};

export default NavBar;
