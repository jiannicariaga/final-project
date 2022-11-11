import React from 'react';
import Container from 'react-bootstrap/Container';
import parseRoute from './lib/parse-route';
import Nav from './components/nav';
import Home from './pages/home';
import SearchResults from './pages/search-results';
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
    if (route.path === 'search-results') {
      const term = route.params.get('term');
      const location = route.params.get('location');
      const latitude = route.params.get('latitude');
      const longitude = route.params.get('longitude');
      return (
        <SearchResults
          term={term}
          location={location}
          latitude={latitude}
          longitude={longitude} />
      );
    }
  }

  render() {
    return (
      <>
        <Nav />
        <Container as="main">
          {this.renderPage()}
        </ Container>
      </>
    );
  }
}
