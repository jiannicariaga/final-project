import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function Auth(props) {
  return (
    <>
      <Container className='p-0 mb-3'>
        <Row className='align-items-center p-0 my-3'>
          <Col>
            <h2 className='fw-bold mb-0'>
              Log In
            </h2>
          </Col>
          <Col xs='auto'>
            <a
              className='back-link fw-bold text-end'
              onClick={() => history.back()} >
              Back
            </a>
          </Col>
        </Row>
      </Container>
      <Container className='p-0 mb-3'>
        <Row />
      </Container>
    </>
  );
}
