import React from 'react';
import jwtDecode from 'jwt-decode';
import Container from 'react-bootstrap/Container';
import { AppContext, parseRoute } from './lib';
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
    this.state = {
      user: null,
      route: parseRoute(window.location.hash)
    };
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  handleSignIn(result) {
    const { user, token } = result;
    window.localStorage.setItem('yeat', token);
    this.setState({ user });
    window.location.hash = '#';
  }

  handleSignOut() {
    window.localStorage.removeItem('yeat');
    this.setState({ user: null });
    window.location.hash = '#';
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({ route: parseRoute(window.location.hash) });
    });
    const token = window.localStorage.getItem('yeat');
    const user = token ? jwtDecode(token) : null;
    this.setState({ user });
  }

  renderPage() {
    const { route } = this.state;
    if (route.path === '') return <Home />;
    if (route.path === 'log-in' || route.path === 'sign-up') return <Auth />;
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
    const { user, route } = this.state;
    const { handleSignIn, handleSignOut } = this;
    const contextValue = { user, route, handleSignIn, handleSignOut };
    return (
      <AppContext.Provider value={contextValue}>
        <Navigation />
        <Container as="main">
          {this.renderPage()}
        </Container>
      </AppContext.Provider>
    );
  }
}
