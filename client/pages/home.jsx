import React from 'react';
import SearchForm from '../components/search-form';
import Definition from '../components/definition';

export default function Home(props) {
  return (
    <main className='container'>
      <SearchForm />
      <Definition />
    </main>
  );
}
