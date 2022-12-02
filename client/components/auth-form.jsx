import React from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock }
  from '@fortawesome/free-solid-svg-icons';

const styles = {
  taken: {
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
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  handleChange(event) {
    const { id, value } = event.target;
    if (id === 'username') this.setState({ username: value });
    if (id === 'password') this.setState({ password: value });
  }

  render() {
    const { username, password, message } = this.state;
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
        </ InputGroup>
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
        </ InputGroup>
        <Container
          className='message text-center fw-bold p-0 mt-1'
          style={styles.taken} >
          {message}
        </ Container>
        <Container className='d-flex justify-content-center p-0 mt-4'>
          <Button
            className='action-button fw-bold border-0'
            as='button'
            type='submit'>
            Log In
          </Button>
        </Container>
      </ Form>
    );
  }
}
