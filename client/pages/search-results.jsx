import React from 'react';

export default class SearchResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      center: null
    };
  }

  componentDidMount() {
    const url = new URL('localhost:3000/search-results');
    for (const key in this.props) {
      if (this.props) url.searchParams.append(key, this.props[key]);
    }
    fetch(`/search-results${url.search}`)
      .then(response => response.json())
      .then(data => {
        const lat = data.region.center.latitude;
        const lng = data.region.center.longitude;
        this.setState({
          results: data.businesses,
          center: { lat, lng }
        });
      })
      .catch(err => console.error(err));
  }

  render() {
    return (
      <div />
    );
  }
}
