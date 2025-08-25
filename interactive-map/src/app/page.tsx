"use client";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

export default function Home() {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#">Interactive Map</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#">Home</Nav.Link>
            </Nav>
            <Nav className="justify-content-end">
              <Button variant="outline-light" className="me-2">
                Log In
              </Button>
              <Button variant="primary">Sign Up</Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="d-flex justify-content-center align-items-center vh-100">
        <Button variant="primary" size="lg">
          Get Started
        </Button>
      </div>
    </>
  );
}
