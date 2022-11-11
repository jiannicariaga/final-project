import React from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function result(props) {
  const { name, distance, categories, display_phone: phone } = props.result;
  const { address1, city, state, zip_code: zipCode } = props.result.location;
  const miles = distance * 0.000621371192;
  const address2 = `${city}, ${state} ${zipCode}`;
  const imageStyle = {
    background: `url(${props.result.image_url}) no-repeat center`,
    backgroundSize: 'cover',
    borderRadius: '10px 0 0 10px'
  };
  const displayPhoneIcon = phone
    ? <><Card.Text as='span' className='fas fa-phone' /><br /></>
    : null;
  const displayAddress1 = address1
    ? <>{address1}<br /></>
    : null;
  return (
    <Col md={6}>
      <Card
        className='shadow-sm'
        style={{ borderRadius: '10px' }} >
        <Row
          className='flex-nowrap g-0'
          style={{ height: '220px' }}>
          <Col
            style={imageStyle}
            xs={3} />
          <Col>
            <Card.Body>
              <Row className='flex-nowrap'>
                <Col>
                  <Card.Title className='fw-bold'>
                    {name}
                  </Card.Title>
                </Col>
                <Col
                  className='align-self-center text-end'
                  xs='auto'>
                  <Card.Subtitle>
                    {miles.toFixed(2) + 'mi'}
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
                    className='fas fa-location-dot' />
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
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </Col>
  );
}
