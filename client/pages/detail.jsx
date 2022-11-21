import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DetailCard from '../components/detail-card';
import Notification from '../components/notification';
import Map from '../components/map';

export default class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      details: null,
      inRoulette: [],
      inFavorites: [],
      message: '',
      eateryGeolocation: null
    };
    this.addToRoulette = this.addToRoulette.bind(this);
    this.removeFromRoulette = this.removeFromRoulette.bind(this);
    this.addToFavorites = this.addToFavorites.bind(this);
    this.removeFromFavorites = this.removeFromFavorites.bind(this);
    this.clearMessage = this.clearMessage.bind(this);
  }

  addToRoulette(event) {
    const { details, inRoulette } = this.state;
    const headers = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(details)
    };
    fetch('/roulette', headers)
      .then(response => response.json())
      .then(data => {
        const { restaurantId, details } = data;
        this.setState({
          inRoulette: inRoulette.concat(restaurantId),
          message: `${details.name} was added to Roulette.`
        });
      })
      .catch(err => console.error(err));
  }

  removeFromRoulette(event) {
    const { id } = event.target;
    const { details, inRoulette } = this.state;
    fetch(`/roulette/${id}`, { method: 'DELETE' })
      .then(response => response.json())
      .then(data => {
        this.setState({
          inRoulette: inRoulette.filter(item => item !== data),
          message: `${details.name} was removed from Roulette.`
        });
      })
      .catch(err => console.error(err));
  }

  addToFavorites(event) {
    const { details, inFavorites } = this.state;
    const headers = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(details)
    };
    fetch('/favorites', headers)
      .then(response => response.json())
      .then(data => {
        const { restaurantId, details } = data;
        this.setState({
          inFavorites: inFavorites.concat(restaurantId),
          message: `${details.name} was added to Favorites.`
        });
      })
      .catch(err => console.error(err));
  }

  removeFromFavorites(event) {
    const { id } = event.target;
    const { details, inFavorites } = this.state;
    fetch(`/favorites/${id}`, { method: 'DELETE' })
      .then(response => response.json())
      .then(data => {
        this.setState({
          inFavorites: inFavorites.filter(item => item !== data),
          message: `${details.name} was removed from Favorites.`
        });
      })
      .catch(err => console.error(err));
  }

  clearMessage() {
    this.setState({ message: '' });
  }

  componentDidMount() {
    const { id } = this.props;
    const url = new URL(`/detail?id=${id}`, window.location);
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const { inRoulette, inFavorites, coordinates } = data;
        const lat = coordinates.latitude;
        const lng = coordinates.longitude;
        this.setState({
          details: data,
          inRoulette,
          inFavorites,
          eateryGeolocation: { lat, lng }
        });
      })
      .catch(err => console.error(err));
  }

  render() {
    const { id } = this.props;
    const { details, inRoulette, inFavorites, message, eateryGeolocation } =
    this.state;
    const displayNotification = message
      ? <Notification message={message} clearMessage={this.clearMessage} />
      : null;
    const displayMap = !details
      ? (
        <p className='text-center fw-bold my-5'>
          Google Maps failed to load.
        </p>
        )
      : (
        <Map
          data={details}
          center={eateryGeolocation} />
        );
    const displayDetail = !details
      ? (
        <p className='text-center my-5'>
          <span className='fw-bold'>Unable to load Details.</span>
          <br />
          Please try again.
        </p>
        )
      : (
        <DetailCard
          details={details}
          isInRoulette={inRoulette.includes(id)}
          addToRoulette={this.addToRoulette}
          removeFromRoulette={this.removeFromRoulette}
          isInFavorites={inFavorites.includes(id)}
          addToFavorites={this.addToFavorites}
          removeFromFavorites={this.removeFromFavorites} />
        );
    return (
      <>
        {displayNotification}
        {displayMap}
        <Container className='p-0 mb-3'>
          <Row className='align-items-center p-0'>
            <Col>
              <h2 className='fw-bold mb-0'>Details</h2>
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
            <Col>
              {displayDetail}
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}
