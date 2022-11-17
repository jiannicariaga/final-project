import React from 'react';

export default class Roulette extends React.Component {
  constructor(props) {
    super(props);
    this.state = { inRoulette: [] };
  }

  componentDidMount() {
    const url = new URL('/roulette', window.location);
    fetch(url)
      .then(response => response.json())
      .then(data => this.setState({ inRoulette: data }))
      .catch(err => console.error(err));
  }

  render() {
    return (
      <div />
    );
  }
}
