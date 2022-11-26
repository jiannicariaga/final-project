import React from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faLocationDot } from '@fortawesome/free-solid-svg-icons';

const METERS_TO_MILES = 0.000621371192;

export default function ResultCard(props) {
  const {
    result,
    isInRoulette, addToRoulette, removeFromRoulette,
    isInFavorites, addToFavorites, removeFromFavorites
  } = props;
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
    },
    cardTitle: {
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'hidden'
    }
  };
  const miles = distance * METERS_TO_MILES;
  const displayMiles = isNaN(miles)
    ? ''
    : `${miles.toFixed(2)}mi`;
  const displayPhoneIcon = phone
    ? <><FontAwesomeIcon className='phone-icon' icon={faPhone} /><br /></>
    : null;
  const displayAddress1 = address1
    ? <>{address1}<br /></>
    : null;
  const address2 = `${city}, ${state} ${zipCode}`;
  const rouletteButtonAction = isInRoulette
    ? removeFromRoulette
    : addToRoulette;
  const rouletteButtonText = isInRoulette
    ? 'Remove from Roulette'
    : 'Add to Roulette';
  const favoritesButtonAction = isInFavorites
    ? removeFromFavorites
    : addToFavorites;
  const favoritesButtonText = isInFavorites
    ? 'Remove from Favorites'
    : 'Add to Favorites';
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
                <Col style={styles.cardTitle}>
                  <Card.Title
                    className='card-name fw-bold'
                    as='a'
                    href={`#detail?id=${id}`} >
                    {name}
                  </Card.Title>
                </Col>
                <Col
                  className='text-end'
                  xs='auto'>
                  <Card.Subtitle className='mt-0'>
                    {displayMiles}
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
                  <FontAwesomeIcon
                    className='location-icon text-center'
                    icon={faLocationDot} />
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
                    className='card-button fw-bold border-0 p-0'
                    variant='link'
                    onClick={rouletteButtonAction} >
                    {rouletteButtonText}
                  </Button>
                </Col>
              </Row>
              <Row className='mb-2'>
                <Col>
                  <Button
                    id={id}
                    className='card-button fw-bold border-0 p-0'
                    variant='link'
                    onClick={favoritesButtonAction} >
                    {favoritesButtonText}
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
