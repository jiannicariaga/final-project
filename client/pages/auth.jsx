import React from 'react';
import { AppContext } from '../lib';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import AuthForm from '../components/auth-form';

export default class Auth extends React.Component {
  render() {
    const { route, handleSignIn } = this.context;
    const display = route.path === 'login'
      ? {
          header: 'Log In',
          question: <>Don&#39;t have an account?&nbsp;</>,
          path: '#signup',
          action: 'Sign Up'
        }
      : {
          header: 'Sign Up',
          question: <>Already have an account?&nbsp;</>,
          path: '#login',
          action: 'Log In'
        };
    return (
      <>
        <Container className='p-0 mb-3'>
          <Row className='align-items-center p-0 my-3'>
            <Col>
              <h2 className='fw-bold mb-0'>
                {display.header}
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
            <AuthForm
              path={route.path}
              handleSignIn={handleSignIn} />
          </Row>
          <Row className='text-center fw-bold p-0 mt-4'>
            <p className='m-0'>
              {display.question}
              <a
                className='auth-link'
                href={display.path} >
                {display.action}
              </a>
            </p>
          </Row>
        </Container>
      </>
    );
  }
}

Auth.contextType = AppContext;
