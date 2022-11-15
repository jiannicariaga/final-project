import React from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

const METERS_TO_MILES = 0.000621371192;

export default function ResultCard(props) {
  const { result, inRoulette, addToRoulette } = props;
  const { id, name, distance, categories, display_phone: phone } = result;
  const { address1, city, state, zip_code: zipCode } = result.location;
  const styles = {
    card: {
      color: '#FFFFFF',
      border: 0,
      textDecoration: 'none'
    },
    background: {
      height: '250px',
      background: `url(${result.image_url}) no-repeat center`,
      boxShadow: 'inset 0 0 0 100vw rgb(0 0 0 / 60%)',
      backgroundSize: 'cover',
      borderRadius: '10px'
    }
  };
  const miles = distance * METERS_TO_MILES;
  const displayPhoneIcon = phone
    ? (
      <>
        <Card.Text
          as='span'
          className='phone-icon fas fa-phone' />
        <br />
      </>
      )
    : null;
  const displayAddress1 = address1
    ? (
      <>
        {address1}
        <br />
      </>
      )
    : null;
  const address2 = `${city}, ${state} ${zipCode}`;
  const rouletteText = !inRoulette.includes(id)
    ? 'Add to Roulette'
    : 'Remove from Roulette';
  return (
    <Col md={6}>
      <Card
        className='shadow'
        style={styles.card} >
        <Row
          className='flex-nowrap g-0'
          style={styles.background} >
          <Col>
            <Card.Body>
              <Row className='flex-nowrap align-items-center mb-2'>
                <Col>
                  <Card.Title
                    className='name fw-bold'
                    as='a'
                    href={`#detail?id=${id}`} >
                    {name}
                  </Card.Title>
                </Col>
                <Col
                  className='text-end'
                  xs='auto'>
                  <Card.Subtitle className='mt-0'>
                    {`${miles.toFixed(2)}mi`}
                  </Card.Subtitle>
                </Col>
              </Row>
              <Row className='mb-2'>
                <Card.Subtitle className='fst-italic'>
                  {categories[0].title}
                </Card.Subtitle>
              </Row>
              <Row className='mb-2'>
                <Col xs='auto'>
                  {displayPhoneIcon}
                  <Card.Text
                    as='span'
                    className='location-icon fas fa-location-dot text-center' />
                </Col>
                <Col className='p-0'>
                  <Card.Text className='m-0'>
                    {phone}
                  </Card.Text>
                  <Card.Text className='m-0'>
                    {displayAddress1}{address2}
                  </Card.Text>
                </Col>
              </Row>
              <Row className='mb-2'>
                <Col>
                  <Button
                    id={id}
                    className='roulette-link border-0 p-0'
                    variant='link'
                    onClick={addToRoulette} >
                    {rouletteText}
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </Col>
  );
}
