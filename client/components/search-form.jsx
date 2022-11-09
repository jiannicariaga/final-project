import React from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

export default class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: '',
      location: '',
      geolocation: null,
      message: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.getGeolocation = this.getGeolocation.bind(this);
  }

  handleChange(event) {
    if (event.target.className.includes('term')) {
      this.setState({ term: event.target.value });
    }
    if (event.target.className.includes('location')) {
      if (!event.target.value) this.setState({ message: '' });
      if (this.state.geolocation) {
        this.setState({
          geolocation: null,
          message: 'Device location removed.'
        });
      }
      this.setState({ location: event.target.value });
    }
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
        <Form className='mt-4' >
          <InputGroup className='shadow-sm mb-2' >
            <InputGroup.Text className='border-0'>
              <span className='fas fa-magnifying-glass' />
            </InputGroup.Text>
            <Form.Control
              required
              className='term shadow-none border-0'
              placeholder='Tacos, Japanese, Dessert, etc.'
              onChange={this.handleChange}
              value={this.state.term} />
          </ InputGroup>
          <InputGroup className='shadow-sm' >
            <InputGroup.Text className='border-0'>
              <span className='fas fa-location-dot' />
            </InputGroup.Text>
            <Form.Control
              required
              className='location shadow-none border-0'
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
