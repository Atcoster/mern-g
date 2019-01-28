import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import AuthPage from './pages/Auth/Auth';
import EventsPage from './pages/Events/Events';
import BookingsPage from './pages/Bookings/Bookings';
import MainNavigation from './components/navigation/MainNavigation';

class App extends Component {
	render() {
		return (
			<BrowserRouter>
				<React.Fragment>
					<MainNavigation />
					<div className="content">
						<Switch>
							<Redirect from="/" to="/auth" exact />
							<Route path="/auth" component={AuthPage} />
							<Route path="/events" component={EventsPage} />
							<Route path="/bookings" component={BookingsPage} />
						</Switch>
					</div>
				</React.Fragment>
			</BrowserRouter>
		);
	}
}

export default App;
