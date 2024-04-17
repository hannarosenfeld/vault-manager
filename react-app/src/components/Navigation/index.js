// Navigation.js

import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import SearchBar from './SearchBar';
import './Navigation.css';
import naglee from './naglee.png';

function Navigation({ isLoaded, company, isWarehousePage }) {
  const sessionUser = useSelector((state) => state.session.user);

  console.log("😎", isWarehousePage)

  return (
    <div className="wrapper nav-container">
      <ul className="navigation">
        <li className="home-button">
          <NavLink exact to="/">
            <img src={naglee} alt="Logo" />
          </NavLink>
        </li>
        {isLoaded && isWarehousePage && (
          <li className="search-bar-container">
            <SearchBar />
          </li>
        )}
        {isLoaded && (
          <li>
            <ProfileButton user={sessionUser} company={company} />
          </li>
        )}
      </ul>
    </div>
  );
}

export default Navigation;
