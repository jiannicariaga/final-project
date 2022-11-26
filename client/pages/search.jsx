import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Notification from '../components/notification';
import Map from '../components/map';
import Loader from '../components/loader';
import ResultCard from '../components/result-card';

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      inRoulette: [],
      inFavorites: [],
      message: '',
      clientGeolocation: null
    };
    this.addToRoulette = this.addToRoulette.bind(this);
    this.removeFromRoulette = this.removeFromRoulette.bind(this);
    this.addToFavorites = this.addToFavorites.bind(this);
    this.removeFromFavorites = this.removeFromFavorites.bind(this);
    this.clearMessage = this.clearMessage.bind(this);
  }

  addToRoulette(event) {
    const { id } = event.target;
    const { results, inRoulette } = this.state;
    const eateryData = results.find(result => result.id === id);
    const headers = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(eateryData)
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
    const { results, inRoulette } = this.state;
    const eateryData = results.find(data => data.id === id);
    fetch(`/roulette/${id}`, { method: 'DELETE' })
      .then(response => response.json())
      .then(data => {
        this.setState({
          inRoulette: inRoulette.filter(item => item !== data),
          message: `${eateryData.name} was removed from Roulette.`
        });
      })
      .catch(err => console.error(err));
  }

  addToFavorites(event) {
    const { id } = event.target;
    const { results, inFavorites } = this.state;
    const eateryData = results.find(result => result.id === id);
    const headers = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(eateryData)
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
    const { results, inFavorites } = this.state;
    const eateryData = results.find(data => data.id === id);
    fetch(`/favorites/${id}`, { method: 'DELETE' })
      .then(response => response.json())
      .then(data => {
        this.setState({
          inFavorites: inFavorites.filter(item => item !== data),
          message: `${eateryData.name} was removed from Roulette.`
        });
      })
      .catch(err => console.error(err));
  }

  clearMessage() {
    this.setState({ message: '' });
  }

  componentDidMount() {
    const url = new URL('/search-results', window.location);
    for (const key in this.props) {
      if (this.props[key]) url.searchParams.append(key, this.props[key]);
    }
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const { businesses, inRoulette, inFavorites, region } = data;
        const lat = region.center.latitude;
        const lng = region.center.longitude;
        this.setState({
          results: businesses,
          inRoulette,
          inFavorites,
          clientGeolocation: { lat, lng }
        });
      })
      .catch(err => console.error(err));
  }

  render() {
    const { results, inRoulette, inFavorites, message, clientGeolocation } =
    this.state;
    const displayNotification = message
      ? <Notification message={message} clearMessage={this.clearMessage} />
      : null;
    const displayMap = !results
      ? <Loader />
      : (
        <Map
          data={results}
          center={clientGeolocation} />
        );
    const eateries = results.map(result => {
      return (
        <ResultCard
          key={result.id}
          result={result}
          isInRoulette={inRoulette.includes(result.id)}
          addToRoulette={this.addToRoulette}
          removeFromRoulette={this.removeFromRoulette}
          isInFavorites={inFavorites.includes(result.id)}
          addToFavorites={this.addToFavorites}
          removeFromFavorites={this.removeFromFavorites} />
      );
    });
    const displayEateries = !eateries.length ? <Loader /> : eateries;
    return (
      <>
        {displayNotification}
        {displayMap}
        <Container className='p-0 mb-3'>
          <Row className='align-items-center p-0 my-3'>
            <Col>
              <h2 className='fw-bold mb-0'>
                Results
              </h2>
            </Col>
            <Col xs='auto'>
              <a
                className='back-link fw-bold text-end'
                href='#' >
                New Search
              </a>
            </Col>
          </Row>
        </Container>
        <Container className='p-0 mb-3'>
          <Row className='gx-3 gy-3'>
            {displayEateries}
          </Row>
        </Container>
      </>
    );
  }
}
