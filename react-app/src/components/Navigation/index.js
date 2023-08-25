import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import naglee from './naglee.png'


function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	return (
		<div className='wrapper'>
			<ul className='navigation'>
				<li className='home-button'>
					<NavLink exact to="/">
						<img src={naglee} />
					</NavLink>
				</li>
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