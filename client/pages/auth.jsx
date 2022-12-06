import React from 'react';
import { AppContext } from '../lib';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import AuthForm from '../components/auth-form';

export default class Auth extends React.Component {
  render() {
    const { route, handleSignIn } = this.context;
    const displayHeader = route.path === 'log-in' ? 'Log In' : 'Sign Up';
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
                href='#' >
                Home
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
        </Container>
      </>
    );
  }
}

Auth.contextType = AppContext;
