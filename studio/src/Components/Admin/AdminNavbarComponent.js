import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Button, Form, Nav, Navbar, Container, NavDropdown } from 'react-bootstrap';

function AdminNavbarComponent() {

    // Method for logout
    async function logout(event) {
        event.preventDefault();

        sessionStorage.removeItem("position");
        sessionStorage.removeItem("userId");
        window.location.href = "/Login";
    };

    return (
        <div>
            <Navbar collapseOnSelect expand="xxl" bg="dark" variant="dark" fixed="top">
                <Container>
                    <Navbar.Brand href="/Home">HK WEWALAGE PHOTOGRAPY ADMINISTRATION</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">

                        <Nav className="me-auto">

                            <Nav.Link href="/Admin">DASHBOARD</Nav.Link>
                            <Nav.Link href="/Admin/Employees">EMPLOYEES</Nav.Link>
                            <Nav.Link href="/Admin/Events">EVENTS</Nav.Link>
                            <Nav.Link href="/Admin/Graphics">GRAPHIC DESIGNS</Nav.Link>
                            <Nav.Link href="/Admin/Items">ITEMS</Nav.Link>
                            <Nav.Link href="/Admin/Orders">ORDERS</Nav.Link>
                            <Nav.Link href="/Admin/Albums">ALBUMS</Nav.Link>
                            <Nav.Link href="/Admin/Delivery">DELIVERY</Nav.Link>
                            <Nav.Link href="/Admin/Token">TOKENS</Nav.Link>
                            <Nav.Link onClick={logout}>LOGOUT</Nav.Link>

                        </Nav>

                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}

export default AdminNavbarComponent;
