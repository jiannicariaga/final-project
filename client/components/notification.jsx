import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CloseButton from 'react-bootstrap/CloseButton';

const styles = {
  wrapper: {
    position: 'fixed',
    top: '100px',
    left: '50%',
    transform: 'translate(-50%, 0)',
    backgroundImage: 'linear-gradient(#e86a0c, #fe4900)',
    color: '#FFFFFF',
    borderRadius: '10px',
    zIndex: '1'
  },
  dismiss: {
    color: '#FFFFFF',
    fontSize: '0.8rem'
  }
};

export default function Notification(props) {
  const { message, clearMessage } = props;
  if (message) {
    return (
      <Container
        className='w-75 p-3'
        style={styles.wrapper}
        dismissable='true' >
        <Row className='justify-content-between align-items-center'>
          <Col className='fw-bold'>
            {message}
          </Col>
          <Col xs='auto'>
            <CloseButton
            style={styles.dismiss}
            onClick={clearMessage} />
          </Col>
        </Row>
      </Container>
    );
  }
}
