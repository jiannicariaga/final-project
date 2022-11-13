import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const styles = {
  wrapper: {
    color: '#292929'
  },
  word: {
    fontSize: '3rem',
    letterSpacing: '1px'
  },
  ipa: {
    fontSize: '1.5rem'
  },
  speech: {
    fontSize: '1.25rem'
  }
};

export default function Definition(props) {
  return (
    <Container className='p-0 my-4' style={styles.wrapper}>
      <Row className='justify-content-center'>
        <Col xs='auto'>
          <h1 className='fw-bold mb-2' style={styles.word}>yEAT</h1>
          <h3 className='fw-bold mb-0' style={styles.ipa}>&#91; j&#39;i:t &#93;
            <span className='fw-normal' style={styles.speech}> noun</span>
          </h3>
          <hr className='my-3' />
          <p className='mb-2'>The app that answers the dreaded question:</p>
          <p className='fst-italic mb-0'>&#34;What do you want to eat?&#34;</p>
        </Col>
      </Row>
    </Container>
  );
}
