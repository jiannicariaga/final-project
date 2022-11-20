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

  }

  removeFromRoulette(event) {

  }

  removeFromFavorites(event) {

  }

  clearMessage() {

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
