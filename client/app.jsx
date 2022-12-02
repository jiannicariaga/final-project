import React from 'react';
import Container from 'react-bootstrap/Container';
import { parseRoute } from './lib';
import Navigation from './components/navigation';
import Home from './pages/home';
import Auth from './pages/auth';
import Search from './pages/search';
import Detail from './pages/detail';
import Roulette from './pages/roulette';
import Favorites from './pages/favorites';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { route: parseRoute(window.location.hash) };
    this.renderPage = this.renderPage.bind(this);
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({ route: parseRoute(window.location.hash) });
    });
  }

  renderPage() {
    const { route } = this.state;
    if (route.path === '') return <Home />;
    if (route.path === 'auth') return <Auth />;
    if (route.path === 'search') {
      const term = route.params.get('term');
      const location = route.params.get('location');
      const latitude = route.params.get('latitude');
      const longitude = route.params.get('longitude');
      return (
        <Search
          term={term}
          location={location}
          latitude={latitude}
          longitude={longitude} />
      );
    }
    if (route.path === 'detail') {
      const id = route.params.get('id');
      return <Detail id={id} />;
    }
    if (route.path === 'roulette') return <Roulette />;
    if (route.path === 'favorites') return <Favorites />;
  }

  render() {
    return (
      <>
        <Navigation />
        <Container as="main">
          {this.renderPage()}
        </ Container>
      </>
    );
  }
}
