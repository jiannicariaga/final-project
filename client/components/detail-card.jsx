import React from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function DetailCard(props) {
  const { name, categories, display_phone: phone } = props.details;
  const { address1, city, state, zip_code: zipCode } = props.details.location;
  const address2 = `${city}, ${state} ${zipCode}`;
  const styles = {
    card: {
      borderRadius: '10px'
    },
    thumbnail: {
      background: `url(${props.details.image_url}) no-repeat center`,
      backgroundSize: 'cover',
      borderRadius: '10px 10px 0 0',
      height: '220px'
    }
  };
  const displayPhoneIcon = phone
    ? <><Card.Text as='span' className='phone-icon fas fa-phone' /><br /></>
    : null;
  const displayAddress1 = address1
    ? <>{address1}<br /></>
    : null;
  return (
    <Col>
      <Card className='shadow-sm' style={styles.card}>
        <Row className='g-0'>
          <Col style={styles.thumbnail} />
        </Row>
        <Row>
          <Col>
            <Card.Body>
              <Row className='flex-nowrap'>
                <Col>
                  <Card.Title className='eatery-name link fw-bold' >
                    {name}
                  </Card.Title>
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
