import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import AuthForm from '../components/auth-form';

export default class Auth extends React.Component {
  render() {
    const { path } = this.props;
    const displayHeader = path === 'login' ? 'Log In' : 'Sign Up';
    const displayMessage = path === 'login'
      ? <>Don&#39;t have an account?&nbsp;</>
      : <>Already have an account?&nbsp;</>;
    const messageLink = path === 'login' ? '#signup' : '#login';
    const displayMessageLink = path === 'login' ? 'Sign Up' : 'Log In';
    return (
      <>
        <Container className='p-0 mb-3'>
          <Row className='align-items-center p-0 my-3'>
            <Col>
              <h2 className='fw-bold mb-0'>
                {displayHeader}
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
          <Row>
            <AuthForm action={path} />
          </Row>
          <Row className='text-center fw-bold p-0 mt-4'>
            <p className='m-0'>
              {displayMessage}
              <a
                className='auth-link'
                href={messageLink} >
                {displayMessageLink}
              </a>
            </p>
          </Row>
        </Container>
      </>
    );
  }
}
