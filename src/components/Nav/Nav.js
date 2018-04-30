import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => (
  <div className="navbar">
    <div>
      <ul>
        <li>
          <Link to="/interface">
            Interface
          </Link>
        </li>
        <li>
          <Link to="/list">
            List Page
          </Link>
        </li>
      </ul>
    </div>
  </div>
);

export default Nav;
