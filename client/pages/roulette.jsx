import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ResultCard from '../components/result-card';
import Notification from '../components/notification';

export default class Roulette extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inRoulette: [],
      message: ''
    };
    this.removeFromRoulette = this.removeFromRoulette.bind(this);
    this.clearMessage = this.clearMessage.bind(this);
  }

  removeFromRoulette(event) {
    const { id } = event.target;
    const { inRoulette } = this.state;
    const eateryData = inRoulette.find(data => data.id === id);
    fetch(`/roulette/remove/${id}`, { method: 'DELETE' })
      .then(response => response.json())
      .then(
        this.setState({
          inRoulette: inRoulette.filter(item => item.id !== id),
          message: `${eateryData.name} was removed from Roulette.`
        })
      )
      .catch(err => console.error(err));
  }

  clearMessage() {
    this.setState({ message: '' });
  }

  componentDidMount() {
    const url = new URL('/roulette', window.location);
    fetch(url)
      .then(response => response.json())
      .then(data => this.setState({ inRoulette: data }))
      .catch(err => console.error(err));
  }

  render() {
    const { inRoulette, message } = this.state;
    const rouletteItems = inRoulette.map(item => {
      return (
        <ResultCard
          key={item.id}
          result={item}
          isInRoulette={true}
          removeFromRoulette={this.removeFromRoulette} />
      );
    });
    const displayNotification = message
      ? <Notification message={message} clearMessage={this.clearMessage} />
      : null;
    return (
      <>
        {displayNotification}
        <Container className='p-0 mb-3'>
          <Row className='align-items-center p-0 my-3'>
            <Col>
              <h2 className='fw-bold mb-0'>
                Roulette
              </h2>
            </Col>
            <Col xs='auto'>
              <a
                className='link fw-bold text-end'
                href='#' >
                Back
              </a>
            </Col>
          </Row>
        </Container>
        <Container className='p-0 mb-3'>
          <Row className='gx-3 gy-3'>
            {rouletteItems}
          </Row>
        </Container>
      </>
    );
  }
}
