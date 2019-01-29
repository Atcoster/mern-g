import React, { Component } from 'react';
import Modal from '../../components/Modal/Modal';

import Backdrop from '../../components/Backdrop/Backdrop';

import './Events.scss';

class EventsPage extends Component {
	state = {
		creating: false
	};

	startCreateEventHandler = () => {
		this.setState({ creating: true });
	};

	cancelHandler = () => {
		this.setState({ creating: false });
	};

	confirmHandler = () => {
		this.setState({ creating: false });
	};

	render() {
		return (
			<React.Fragment>
				{this.state.creating && <Backdrop />}
				{this.state.creating && (
					<Modal title="Add Event" canCancel canConfirm onCancel={this.cancelHandler} onConfirm={this.confirmHandler}>
						<p>Modal content</p>
					</Modal>
				)}
				<div className="events-control">
					<p>Create your own events</p>
					<button className="btn" onClick={this.startCreateEventHandler}>
						Create Event
					</button>
				</div>
			</React.Fragment>
		);
	}
}

export default EventsPage;
