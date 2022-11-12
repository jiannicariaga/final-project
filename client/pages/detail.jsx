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
    const displayDetail = details ? <DetailCard details={details} /> : null;
    return (
      <>
        <Map data={details} center={eateryGeolocation} />
        <Container className='p-0'>
          <Row className='align-items-center p-0 my-2'>
            <Col>
              <h2 className='fw-bold mb-0'>Details</h2>
            </Col>
            <Col xs='auto'>
              <a className='link text-end' href='#'>Back</a>
            </Col>
          </Row>
        </Container>
        <Container className='p-0 mb-2'>
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
