import React from 'react';

export default class Favorites extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inFavorites: [],
      inRoulette: [],
      message: ''
    };
    this.addToRoulette = this.addToRoulette.bind(this);
    this.removeFromRoulette = this.removeFromRoulette.bind(this);
    this.removeFromFavorites = this.removeFromFavorites.bind(this);
    this.clearMessage = this.clearMessage.bind(this);
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
          inRoulette: inRoulette.filter(item => item.id !== data),
          message: `${eateryData.name} was removed from Roulette.`
        });
      })
      .catch(err => console.error(err));
  }

  removeFromFavorites(event) {
    const { id } = event.target;
    const { inFavorites } = this.state;
    const eateryData = inFavorites.find(data => data.id === id);
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
    return <div />;
  }
}
