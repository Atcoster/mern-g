import React from 'react';
import { NavLink } from 'react-router-dom';

import './MainNavigation.scss';

const mainNavigation = (props: any) => {
	return (
		<header>
			<div className="logo">
				<span>MERN-G APP</span>
			</div>
			<nav className="main-navigation">
				<ul className="main-navigation__list">
					<li>
						<NavLink to="/auth">Authenticate</NavLink>
					</li>
					<li>
						<NavLink to="/events">Events</NavLink>
					</li>
					<li>
						<NavLink to="/bookings">Bookings</NavLink>
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default mainNavigation;
