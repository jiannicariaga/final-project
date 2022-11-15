import React from 'react';
import Container from 'react-bootstrap/Container';
import CloseButton from 'react-bootstrap/CloseButton';

export default function Notification(props) {
  const { message, clearMessage } = props;
  if (message) {
    return (
      <Container dismissable='true'>
        {message}
        <CloseButton onClick={clearMessage} />
      </Container>
    );
  }
}
