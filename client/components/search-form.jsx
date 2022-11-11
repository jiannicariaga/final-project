import React from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

export default class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: '',
      location: '',
      latitude: null,
      longitude: null,
      message: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getGeolocation = this.getGeolocation.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const { term, location, latitude, longitude } = this.state;
    location === 'Current Location' && latitude && longitude
      ? window.location.hash = `#search-results?term=${term}&latitude=${latitude}&longitude=${longitude}`
      : window.location.hash = `#search-results?term=${term}&location=${location}`;
    this.setState({ message: '' });
  }

  handleChange(event) {
    const { id, value } = event.target;
    const { latitude, longitude } = this.state;
    if (id === 'term') this.setState({ term: value });
    if (id === 'location') {
      if (!value) this.setState({ message: '' });
      if (latitude && longitude) {
        this.setState({
          latitude: null,
          longitude: null,
          message: 'Device location removed.'
        });
      }
      this.setState({ location: value });
    }
  }

  getGeolocation(event) {
    if (!navigator.geolocation) {
      this.setState({
        message: 'Geolocation is not supported in your browser.'
      });
      return;
    }
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      this.setState({
        location: 'Current Location',
        latitude,
        longitude,
        message: 'Device location added.'
      });
    });
  }

  render() {
    const { message } = this.state;
    const color = message === 'Device location added.' ? 'added' : 'removed';
    return (
      <Form className='mt-4' onSubmit={this.handleSubmit} >
        <InputGroup className='form-input shadow-sm mb-2' >
          <InputGroup.Text className='form-input-icon border-0'>
            <span className='search-icon fas fa-magnifying-glass' />
          </InputGroup.Text>
          <Form.Control
              required
              id='term'
              className='shadow-none border-0'
              placeholder='Tacos, Japanese, Dessert, etc.'
              onChange={this.handleChange}
              value={this.state.term} />
        </ InputGroup>
        <InputGroup className='form-input text-center shadow-sm' >
          <InputGroup.Text className='form-input-icon border-0'>
            <span className='location-icon fas fa-location-dot' />
          </InputGroup.Text>
          <Form.Control
              required
              id='location'
              className='shadow-none border-0'
              placeholder='City, State, or Zip Code'
              onChange={this.handleChange}
              value={this.state.location} />
          <Button
              className='button border-0'
              type='button'
              title="Use your device's location."
              onClick={this.getGeolocation} >
            <span className='geolocation-icon fas fa-location-crosshairs' />
          </ Button>
        </ InputGroup>
        <Container className={`message ${color} text-center p-0 mt-1`}>
          {message}
        </ Container>
        <Container className='d-flex justify-content-center p-0 mt-4'>
          <Button
            className='button border-0'
            as='button'
            type='submit'>
            Search
          </Button>
        </Container>
      </ Form>
    );
  }
}
