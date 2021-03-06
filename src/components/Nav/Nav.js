import React from 'react';
import { Link } from 'react-router-dom';
import Typography from 'material-ui/Typography';

const Nav = () => (
  <div className="navbar">
    <div>
      <ul>
        <li>
          <Link to="/interface">
            <Typography variant="headline">
              Create
          </Typography>
          </Link>
        </li>
        <li>
          <Link to="/list">
            <Typography variant="headline">
              Saved
            </Typography>
          </Link>
        </li>
      </ul>
    </div>
  </div>
);

export default Nav;
