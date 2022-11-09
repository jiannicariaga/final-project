import React from 'react';
import Container from 'react-bootstrap/Container';

export default function Definition(props) {
  return (
    <Container className='definition'>
      <h1 className='fw-bold mb-2'>yEAT</h1>
      <h3 className='fw-bold mb-0'>&#91; yEEt &#93;
        <span className='fw-normal'> noun</span>
      </h3>
      <hr className='my-3' />
      <p className='mb-2'>The app that answer&#39;s the dreaded question:</p>
      <p className='fst-italic mb-0'>&#34;What do you want to eat?&#34;</p>
    </ Container>
  );
}
