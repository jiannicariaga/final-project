import React from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const METERS_TO_MILES = 0.000621371192;

export default function ResultCard(props) {
  const { result } = props;
  const { id, name, distance, categories, display_phone: phone } = result;
  const { address1, city, state, zip_code: zipCode } = result.location;
  const styles = {
    card: {
      borderRadius: '10px'
    },
    cardHeight: {
      height: '220px'
    },
    thumbnail: {
      background: `url(${result.image_url}) no-repeat center`,
      backgroundSize: 'cover',
      borderRadius: '10px 0 0 10px'
    }
  };
  const miles = distance * METERS_TO_MILES;
  const address2 = `${city}, ${state} ${zipCode}`;
  const displayPhoneIcon = phone
    ? <><Card.Text as='span' className='phone-icon fas fa-phone' /><br /></>
    : null;
  const displayAddress1 = address1
    ? <>{address1}<br /></>
    : null;
  return (
    <Col md={6}>
      <Card className='shadow-sm' style={styles.card}>
        <Row className='flex-nowrap g-0' style={styles.cardHeight}>
          <Col xs={3} style={styles.thumbnail} />
          <Col>
            <Card.Body>
              <Row className='flex-nowrap'>
                <Col>
                  <Card.Title
                    className='eatery-name link fw-bold'
                    as='a'
                    href={`#detail?id=${id}`} >
                    {name}
                  </Card.Title>
                </Col>
                <Col className='align-self-center text-end' xs='auto'>
                  <Card.Subtitle>
                    {`${miles.toFixed(2)}mi`}
                  </Card.Subtitle>
                </Col>
              </Row>
              <Row>
                <Card.Subtitle className='fst-italic'>
                  {categories[0].title}
                </Card.Subtitle>
              </Row>
              <Row className='mt-2'>
                <Col xs='auto'>
                  {displayPhoneIcon}
                  <Card.Text
                    as='span'
                    className='location-icon fas fa-location-dot' />
                </Col>
                <Col className='p-0'>
                  <Card.Text className='m-0'>{phone}</Card.Text>
                  <Card.Text className='m-0'>
                    {displayAddress1}{address2}
                  </Card.Text>
                </Col>
              </Row>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </Col>
  );
}
