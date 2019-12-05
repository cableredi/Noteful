import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder } from '@fortawesome/free-regular-svg-icons';

export default function Header() {
  return (
    <header className='Header'>
      <h1>
        <Link to='/'>
          Noteful <FontAwesomeIcon icon={faFolder} />
        </Link>
      </h1>
    </header>
  )
}