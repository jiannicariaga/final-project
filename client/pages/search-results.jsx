import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Result from '../components/result';
import Map from '../components/map';

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
    const { results, center } = this.state;
    const eateries = results.map(result => {
      const { id } = result;
      return <Result key={id} result={result} />;
    });

    return (
      <>
        <Map results={results} center={center} />
        <Container className='p-0'>
          <Row className='align-items-center p-0 my-2'>
            <Col>
              <h2 className='fw-bold mb-0'>Results</h2>
            </Col>
            <Col xs='auto'>
              <a
                className='new-search text-end'
                href='#'>
                New Search
              </a>
            </Col>
          </Row>
        </Container>
        <Container className='p-0'>
          <Row className='gx-2 gy-2'>{eateries}</Row>
        </Container>
      </>
    );
  }
}
