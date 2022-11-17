import React from 'react';
import NavBar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Nav from 'react-bootstrap/Nav';

const styles = {
  navbar: {
    backgroundImage: 'linear-gradient(#e86a0c, #fe4900)',
    height: '4rem'
  },
  canvas: {
    backgroundImage: 'linear-gradient(#e86a0c, #fe4900)',
    width: '200px'
  },
  canvasTitle: {
    color: '#FFFFFF'
  },
  logo: {
    position: 'absolute',
    top: '0',
    left: '50%',
    transform: 'translateX(-50%)',
    width: 'auto'
  }
};

export default function Navigation(props) {
  return (
    <NavBar
      collapseOnSelect
      className='shadow py-0'
      style={styles.navbar}
      expand='md'
      fixed='top' >
      <Container fluid>
        <a
          style={styles.logo}
          href='#' >
          <img
            src='/images/logo.png'
            alt='logo' />
        </a>
        <NavBar.Toggle
          className='shadow-none border-0'
          style={styles.menuIcon}
          aria-controls='offcanvasNavbar-expand-md' />
        <NavBar.Offcanvas
          style={styles.canvas}
          id='offcanvasNavbar-expand-md'
          aria-labelledby='offcanvasNavbarLabel-expand-md' >
          <Offcanvas.Header
            closeButton
            className='close-button' >
            <Offcanvas.Title
              className='fw-bold'
              style={styles.canvasTitle}
              id='offcanvasNavbarLabel-expand-md' >
              Menu
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-start pe-3">
              <Nav.Link
                className='nav-links'
                href="#roulette">
                Roulette
              </Nav.Link>
            </Nav>
          </Offcanvas.Body>
        </NavBar.Offcanvas>
      </Container>
    </NavBar>
  );
}
