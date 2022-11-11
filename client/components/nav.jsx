import React from 'react';
import NavBar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const styles = {
  navbar: {
    backgroundImage: 'linear-gradient(#e86a0c, #fe4900)'
  }
};

export default function Nav(props) {
  return (
    <NavBar
      className='d-flex justify-content-center shadow py-0'
      style={styles.navbar}
      fixed='top' >
      <Row>
        <Col>
          <a href='#'><img src='/images/logo.png' alt='logo' /></a>
        </Col>
      </Row>
    </ NavBar>
  );
}
