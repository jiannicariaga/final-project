import React from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';

const styles = {
  success: {
    color: '#00b395'
  },
  error: {
    color: '#b33300'
  }
};

export default class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      message: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(event) {
    const { id, value } = event.target;
    if (id === 'username') this.setState({ username: value });
    if (id === 'password') this.setState({ password: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { username, password } = this.state;
    const { path, handleSignIn } = this.props;
    const headers = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    };
    fetch(`/${path}`, headers)
      .then(res => res.json())
      .then(result => {
        if (path === 'sign-up') {
          if ('error' in result) {
            this.setState({
              password: '',
              message: `'${username}' is taken.`
            });
          } else {
            this.setState({
              username: '',
              password: '',
              message: 'Sign up successful. Please log in to continue.'
            });
            window.location.hash = 'log-in';
          }
        }
        if (path === 'log-in') {
          if (result.user && result.token) {
            handleSignIn(result);
          } else {
            this.setState({
              password: '',
              message: 'Username or password is incorrect.'
            });
          }
        }
      });
  }

  handleClick() {
    this.setState({
      username: '',
      password: '',
      message: ''
    });
  }

  render() {
    const { username, password, message } = this.state;
    const { path } = this.props;
    const display = path === 'log-in'
      ? {
          buttonText: 'Log In',
          question: <>Don&#39;t have an account?&nbsp;</>,
          questionLink: '#sign-up',
          linkText: 'Sign Up'
        }
      : {
          buttonText: 'Sign Up',
          question: <>Already have an account?&nbsp;</>,
          questionLink: '#log-in',
          linkText: 'Log In'
        };
    const color = message === 'Sign up successful. Please log in to continue.'
      ? styles.success
      : styles.error;
    return (
      <Form onSubmit={this.handleSubmit} >
        <InputGroup className='form-input shadow-sm mb-2' >
          <InputGroup.Text className='form-input-icon border-0'>
            <FontAwesomeIcon
              className='user-icon'
              icon={faUser} />
          </InputGroup.Text>
          <Form.Control
            required
            id='username'
            className='shadow-none border-0'
            placeholder='Username'
            onChange={this.handleChange}
            value={username} />
        </InputGroup>
        <InputGroup className='form-input text-center shadow-sm' >
          <InputGroup.Text className='form-input-icon border-0'>
            <FontAwesomeIcon
              className='password-icon'
              icon={faLock} />
          </InputGroup.Text>
          <Form.Control
            required
            id='password'
            className='shadow-none border-0'
            type='password'
            placeholder='Password'
            onChange={this.handleChange}
            value={password} />
        </InputGroup>
        <Container
          className='message text-center fw-bold p-0 mt-1'
          style={color} >
          {message}
        </Container>
        <Container className='d-flex justify-content-center p-0 mt-4'>
          <Button
            className='action-button fw-bold border-0'
            as='button'
            type='submit' >
            {display.buttonText}
          </Button>
        </Container>
        <Container className='text-center fw-bold p-0 mt-4'>
          <p className='m-0'>
            {display.question}
            <a
              className='auth-link'
              href={display.questionLink}
              onClick={this.handleClick} >
              {display.linkText}
            </a>
          </p>
        </Container>
      </Form>
    );
  }
}
