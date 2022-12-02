import React from 'react';

export default class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    this.handleSubmit = this.handleChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event) {

  }

  handleChange(event) {

  }

  render() {
    return (
      <div />
    );
  }
}
