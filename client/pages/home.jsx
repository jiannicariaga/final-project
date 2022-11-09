import React from 'react';
import Container from 'react-bootstrap/Container';
import SearchForm from '../components/search-form';
import Definition from '../components/definition';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: []
    };
    this.getData = this.getData.bind(this);
  }

  getData(formInputs) {

  }

  render() {
    return (
      <Container>
        <SearchForm getData={this.getData} />
        <Definition />
      </Container>
    );
  }
}
