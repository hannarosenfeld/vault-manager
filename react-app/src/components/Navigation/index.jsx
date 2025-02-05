import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import naglee from './naglee.png';

function Navigation({ isLoaded, company, isWarehousePage }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <div className="wrapper nav-container">
      <ul className="navigation">
        <li className="home-button">
          <NavLink exact to="/">
            <img src={naglee} alt="Logo" />
          </NavLink>
        </li>
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
