import React from 'react';

export default function NavBar(props) {
  return (
    <nav className='navbar fixed-top shadow py-0' >
      <div className='container-fluid'>
        <div className='mx-auto'>
          <a href='#'>
            <img
              src='/images/logo.png'
              alt='logo' />
          </a>
        </div>
      </div>
    </nav>
  );
}
