import React from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

export default class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: '',
      geolocation: null,
      message: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.getGeolocation = this.getGeolocation.bind(this);
  }

  handleChange(event) {
    if (!event.target.value) this.setState({ message: '' });
    if (this.state.geolocation) {
      this.setState({
        geolocation: null,
        message: 'Device location removed.'
      });
    }
    this.setState({ location: event.target.value });
  }

  getGeolocation(event) {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      this.setState({
        location: 'Current Location',
        geolocation: { latitude, longitude },
        message: 'Device location added.'
      });
    });
  }

  render() {
    const color = this.state.message === 'Device location added.'
      ? 'added'
      : 'removed';
    return (
      <>
        <Form className='mt-5' >
          <InputGroup className='shadow-sm' >
            <Form.Control
              required
              className='shadow-none border-0'
              placeholder='City, State, or Zip Code'
              onChange={this.handleChange}
              value={this.state.location} />
            <Button
              className='border-0'
              title="Use your device's location."
              onClick={this.getGeolocation} >
              <span className='fas fa-location-crosshairs' />
            </ Button>
          </ InputGroup>
        </ Form>
        <div className={`message text-center mt-1 ${color}`}>
          {this.state.message}
        </div>
      </>
    );
  }
}
