import React from 'react';
import Container from 'react-bootstrap/Container';
import SearchForm from '../components/search-form';
import Definition from '../components/definition';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      center: null
    };
    this.getData = this.getData.bind(this);
  }

  getData(inputs) {
    const url = new URL('localhost:3000/search');
    for (const key in inputs) {
      url.searchParams.append(key, inputs[key]);
    }
    fetch('/search' + url.search)
      .then(response => response.json())
      .then(data => {
        const { lat, lng } = data.region.center;
        this.setState({
          results: data.businesses,
          center: { lat, lng }
        });
      })
      .catch(err => console.error(err));
  }

  render() {
    return (
      <Container>
        <SearchForm getData={this.getData} />
        <Definition />
      </Container>
    );
  }
}
