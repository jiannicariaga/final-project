import React from 'react';
import SearchForm from '../components/search-form';
import Defentiion from '../components/defenition';

export default function Home(props) {
  return (
    <main className='container'>
      <SearchForm />
      <Defentiion />
    </main>
  );
}
