import React from 'react';
import Container from 'react-bootstrap/Container';
import SearchForm from '../components/search-form';
import Definition from '../components/definition';

export default function Home(props) {
  return (
    <Container className='p-0'>
      <SearchForm />
      <Definition />
    </Container>
  );
}
