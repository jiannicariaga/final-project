import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Map from '../components/map';
import DetailCard from '../components/detail-card';

export default class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      details: null,
      inRoulette: [],
      eateryGeolocation: null
    };
    this.addToRoulette = this.addToRoulette.bind(this);
  }

  addToRoulette(event) {
    const { details } = this.state;
    const headers = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(details)
    };
    fetch('/roulette/add', headers)
      .then(response => response.json())
      .then(data => {
        const inRouletteCopy = this.state.inRoulette;
        const newInRoulette = inRouletteCopy.concat(data.restaurantId);
        this.setState({
          inRoulette: newInRoulette,
          message: `${data.details.name} was added to Roulette.`
        });
      })
      .catch(err => console.error(err));
  }

  componentDidMount() {
    const url = new URL(`/detail?id=${this.props.id}`, window.location);
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const inRoulette = data.inRoulette;
        const lat = data.coordinates.latitude;
        const lng = data.coordinates.longitude;
        this.setState({
          details: data,
          inRoulette,
          eateryGeolocation: { lat, lng }
        });
      })
      .catch(err => console.error(err));
  }

  render() {
    const { details, inRoulette, eateryGeolocation } = this.state;
    const displayDetail = details
      ? (
        <DetailCard
          details={details}
          inRoulette={inRoulette}
          addToRoulette={this.addToRoulette} />
        )
      : null;
    return (
      <>
        <Container className='shadow p-0 mb-3'>
          <Map data={details} center={eateryGeolocation} />
        </Container>
        <Container className='p-0 mb-3'>
          <Row className='align-items-center p-0'>
            <Col>
              <h2 className='fw-bold mb-0'>Details</h2>
            </Col>
            <Col xs='auto'>
              <a className='link fw-bold text-end' href='#'>Back</a>
            </Col>
          </Row>
        </Container>
        <Container className='p-0 mb-3'>
          <Row>
            <Col>
              {displayDetail}
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}
