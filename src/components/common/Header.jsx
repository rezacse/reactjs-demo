import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  const activeStyle = { color: 'black', 'background-color': 'white' };
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/" activeStyle={activeStyle} exact>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/courses" activeStyle={activeStyle}>
            Courses
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" activeStyle={activeStyle}>
            About
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
