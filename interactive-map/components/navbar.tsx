"use client";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Link from "next/link";

export default function MainNavbar() {
  const isLoggedIn = false; // Replace with actual authentication logic
  return (
    <Navbar bg="dark" data-bs-theme="dark" expand="lg">
      <Container>
        <Navbar.Brand>Interactive Map</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} href="/">Home</Nav.Link>
          </Nav>
          {isLoggedIn ? (
            <></>
          ) : (
            <Nav className="justify-content-end">
              <Nav.Link as={Link} href="/login">
                Log In
              </Nav.Link>
              <Nav.Link as={Link} href="/sign-up">
                Sign Up
              </Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
