import React from 'react';
import Map from '../components/map';

export default class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      details: {},
      eateryGeolocation: null
    };
  }

  componentDidMount() {
    const url = new URL(`/detail?id=${this.props.id}`, window.location);
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const lat = data.coordinates.latitude;
        const lng = data.coordinates.longitude;
        this.setState({
          details: data,
          eateryGeolocation: { lat, lng }
        });
      })
      .catch(err => console.error(err));
  }

  render() {
    const { details, eateryGeolocation } = this.state;
    return (
      <Map data={details} center={eateryGeolocation} />
    );
  }
}
