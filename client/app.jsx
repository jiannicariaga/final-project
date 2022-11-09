import React from 'react';
import parseRoute from './lib/parse-route';
import Nav from './components/nav';
import Home from './pages/home';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash)
    };
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({
        route: parseRoute(window.location.hash)
      });
    });
  }

  render() {
    return (
      <>
        <Nav />
        <Home />
      </>
    );
  }
}
