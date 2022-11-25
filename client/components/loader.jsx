import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function Loader(props) {
  return (
    <Container>
      <Row className='justify-content-center'>
        <Col xs='auto'>
          <div className="lds-facebook my-5">
            <div />
            <div />
            <div />
          </div>
        </Col>
      </Row>
    </Container>
  );
}
