import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import AuthPage from './pages/Auth/Auth';
import EventsPage from './pages/Events/Events';
import BookingsPage from './pages/Bookings/Bookings';
import MainNavigation from './components/Navigation/MainNavigation';

import AppContext from './context/auth-context';

class App extends Component {
	state = {
		token: null,
		userId: null
	};

	login = (token, userId, tokenExpiration) => {
		this.setState({
			token,
			userId
		});
	};

	logout = () => {
		this.setState({
			token: null,
			userId: null
		});
	};

	render() {
		return (
			<BrowserRouter>
				<React.Fragment>
					<AppContext.Provider
						value={{
							token: this.state.token,
							userId: this.state.userId,
							login: this.login,
							logout: this.logout
						}}
					>
						<MainNavigation />
						<main className="content">
							<Switch>
								{this.state.token && <Redirect from="/auth" to="/events" exact />}
								{this.state.token && <Redirect from="/" to="/events" exact />}
								{!this.state.token && <Route path="/auth" component={AuthPage} />}
								<Route path="/events" component={EventsPage} />
								{this.state.token && <Route path="/bookings" component={BookingsPage} />}
								{!this.state.token && <Redirect to="/auth" exact />}
							</Switch>
						</main>
					</AppContext.Provider>
				</React.Fragment>
			</BrowserRouter>
		);
	}
}

export default App;
