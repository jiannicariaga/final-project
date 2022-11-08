import React from 'react';

export default class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <form className='mt-5'>
        <div className='input-group shadow-sm'>
          <input
            type='text'
            className='form-control shadow-none'
            placeholder='City, State, or Zip Code' />
          <div className='input-group-append'>
            <button
              className='btn btn-outline-secondary'
              type='button' >
              <span className='fas fa-location-crosshairs' />
            </button>
          </div>
        </div>
      </form>
    );
  }
}
