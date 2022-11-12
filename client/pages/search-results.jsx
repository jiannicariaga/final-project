import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ResultCard from '../components/result-card';
import Map from '../components/map';

export default class SearchResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      clientGeolocation: null
    };
  }

  componentDidMount() {
    const url = new URL('/search-results', window.location);
    for (const key in this.props) {
      if (this.props[key]) url.searchParams.append(key, this.props[key]);
    }
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const lat = data.region.center.latitude;
        const lng = data.region.center.longitude;
        this.setState({
          results: data.businesses,
          clientGeolocation: { lat, lng }
        });
      })
      .catch(err => console.error(err));
  }

  render() {
    const { results, clientGeolocation } = this.state;
    const eateries = results.map(result => {
      const { id } = result;
      return <ResultCard key={id} result={result} />;
    });

    return (
      <>
        <Container className='p-0'>
          <Map data={results} center={clientGeolocation} />
        </Container>
        <Container className='p-0'>
          <Row className='align-items-center p-0 my-2'>
            <Col>
              <h2 className='fw-bold mb-0'>Results</h2>
            </Col>
            <Col xs='auto'>
              <a className='link text-end' href='#'>New Search</a>
            </Col>
          </Row>
        </Container>
        <Container className='p-0 mb-2'>
          <Row className='gx-2 gy-2'>
            {eateries}
          </Row>
        </Container>
      </>
    );
  }
}
