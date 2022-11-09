import React from 'react';
import NavBar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

export default function Nav(props) {
  return (
    <NavBar
      fixed='top'
      className='shadow py-0' >
      <Container fluid>
        <div className='mx-auto'>
          <a href='#'>
            <img
              src='/images/logo.png'
              alt='logo' />
          </a>
        </div>
      </ Container>
    </ NavBar>
  );
}
