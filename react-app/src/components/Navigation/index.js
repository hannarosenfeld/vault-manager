// Navigation.js

import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import SearchBar from './SearchBar';
import './Navigation.css';
import naglee from './naglee.png';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <div className="wrapper" style={{ padding: '5px 10px' }}>
      <ul className="navigation">
        <li className="home-button">
          <NavLink exact to="/">
            <img src={naglee} alt="Logo" />
          </NavLink>
        </li>
        {isLoaded && (
          <li className="search-bar-container">
            <SearchBar />
          </li>
        )}
        {isLoaded && (
          <li>
            <ProfileButton user={sessionUser} />
          </li>
        )}
      </ul>
    </div>
  );
}

export default Navigation;
