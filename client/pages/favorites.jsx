import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ResultCard from '../components/result-card';
import Notification from '../components/notification';

export default class Favorites extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inFavorites: [],
      inRoulette: [],
      message: ''
    };
    this.removeFromFavorites = this.removeFromFavorites.bind(this);
    this.addToRoulette = this.addToRoulette.bind(this);
    this.removeFromRoulette = this.removeFromRoulette.bind(this);
    this.clearMessage = this.clearMessage.bind(this);
  }

  removeFromFavorites(event) {
    const { id } = event.target;
    const { inFavorites } = this.state;
    const eateryData = inFavorites.find(data => data.id === id);
    fetch(`/favorites/${id}`, { method: 'DELETE' })
      .then(response => response.json())
      .then(data => {
        this.setState({
          inFavorites: inFavorites.filter(item => item.id !== data),
          message: `${eateryData.name} was removed from Favorites.`
        });
      })
      .catch(err => console.error(err));
  }

  addToRoulette(event) {
    const { id } = event.target;
    const { inFavorites, inRoulette } = this.state;
    const eateryData = inFavorites.find(result => result.id === id);
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
    const { inFavorites, inRoulette } = this.state;
    const eateryData = inFavorites.find(data => data.id === id);
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

  clearMessage() {
    this.setState({ message: '' });
  }

  componentDidMount() {
    const url = new URL('/favorites', window.location);
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const { inFavorites, inRoulette } = data;
        this.setState({
          inFavorites,
          inRoulette
        });
      })
      .catch(err => console.error(err));
  }

  render() {
    const { inFavorites, inRoulette, message } = this.state;
    const displayNotification = message
      ? <Notification message={message} clearMessage={this.clearMessage} />
      : null;
    const eateries = inFavorites.map(eatery => {
      return (
        <ResultCard
          key={eatery.id}
          result={eatery}
          isInRoulette={inRoulette.includes(eatery.id) }
          addToRoulette={this.addToRoulette}
          removeFromRoulette={this.removeFromRoulette}
          isInFavorites={true}
          removeFromFavorites={this.removeFromFavorites} />
      );
    });
    const displayEateries = !eateries.length
      ? (
        <p className='text-center my-5'>
          <span className='fw-bold'>No Favorites</span>
          <br />
          Eateries added to favorites are shown here.
        </p>
        )
      : eateries;
    return (
      <>
        {displayNotification}
        <Container className='p-0 mb-3'>
          <Row className='align-items-center p-0 my-3'>
            <Col>
              <h2 className='fw-bold mb-0'>
                Favorites
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
          <Row className='gx-3 gy-3'>
            {displayEateries}
          </Row>
        </Container>
      </>
    );
  }
}
