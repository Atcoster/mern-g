import React from 'react';
import { NavLink } from 'react-router-dom';

import AuthContext from '../../context/auth-context';

import './MainNavigation.scss';

const mainNavigation = (props: any) => {
	return (
		<AuthContext.Consumer>
			{context => {
				return (
					<header className="main-header">
						<div className="logo">
							<span>MERN-G APP</span>
						</div>
						<nav className="main-navigation">
							<ul className="main-navigation__list">
								{!context!.token && (
									<li>
										<NavLink to="/auth">Authenticate</NavLink>
									</li>
								)}
								<li>
									<NavLink to="/events">Events</NavLink>
								</li>
								{context!.token && (
									<React.Fragment>
										<li>
											<NavLink to="/bookings">Bookings</NavLink>
										</li>
										<li>
											<button onClick={context!.logout}>Logout</button>
										</li>
									</React.Fragment>
								)}
							</ul>
						</nav>
					</header>
				);
			}}
		</AuthContext.Consumer>
	);
};

export default mainNavigation;
