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

export default function NotFound(props) {
  return (
    <Container
      className='p-0 my-5'
      style={styles.wrapper} >
      <Row className='justify-content-center'>
        <Col xs='auto'>
          <h1
            className='fw-bold mb-2'
            style={styles.word}>
            404
          </h1>
          <h3
            className='fw-bold mb-0'
            style={styles.ipa}>
            &#91; n&#39;a&#58;t f&#39;a͡ʊnd &#93;
            <span
              className='fw-normal'
              style={styles.speech} >
              &nbsp;error
            </span>
          </h3>
          <hr className='my-3' />
          <p className='mb-2'>
            The page you are looking for does not exist.
          </p>
          <p className='fst-italic mb-0'>
            Return to&nbsp;
            <a
              className='auth-link'
              href='#' >
              yeat.jiannicariaga.dev
            </a>.
          </p>
        </Col>
      </Row>
    </Container>
  );
}
