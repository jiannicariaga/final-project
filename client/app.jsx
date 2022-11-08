import React from 'react';
import NavBar from './components/navbar';
import Home from './pages/home';

export default class App extends React.Component {
  render() {
    return (
      <>
        <NavBar />
        <Home />
      </>
    );
  }
}
