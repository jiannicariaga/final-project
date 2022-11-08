import React from 'react';
import Nav from './components/nav';
import Home from './pages/home';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class App extends React.Component {
  render() {
    return (
      <>
        <Nav />
        <Home />
      </>
    );
  }
}
