import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import { Button, Form, Nav, Navbar, Container, NavDropdown } from 'react-bootstrap';

function NavbarComponent() {
    return (
        <div>
            <Navbar collapseOnSelect expand="xxl" bg="dark" variant="dark" fixed="top">
                <Container>
                    <Navbar.Brand href="/Home">HK WEWALAGE PHOTOGRAPY</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">

                        <Nav className="me-auto">

                            <Nav.Link href="/">HOME</Nav.Link>
                            <Nav.Link href="/#about">ABOUT</Nav.Link>
                            <Nav.Link href="/#contactus">CONTACT US</Nav.Link>
                            <Nav.Link href="/Album">ALBUM</Nav.Link>
                            <NavDropdown title="BOOKING" id="collasible-nav-dropdown">
                                <NavDropdown.Item href="/Booking">BOOKING NOW</NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title="ORDER NOW" id="collasible-nav-dropdown">
                                <NavDropdown.Item href="/Order/DecorativeItems">DECORATIVE ITEMS</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="/Order/PersonalizedItems">PERSONALIZED ITEMS</NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title="GRAPHIC DESIGNER" id="collasible-nav-dropdown">
                                <NavDropdown.Item href="/GraphicDesigner/PhotoEdit">PHOTO EDITING</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="/GraphicDesigner/LogoDesign">LOGO DESIGN</NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link href="/Token">TOKEN</Nav.Link>
                            <Nav.Link href="/Search">SEARCH</Nav.Link>

                        </Nav>

                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}

export default NavbarComponent;
