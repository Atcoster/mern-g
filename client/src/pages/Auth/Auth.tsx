import React, { Component, createRef, RefObject } from 'react';

import './Auth.scss';

class AuthPage extends Component {
	private readonly _emailRef: RefObject<HTMLInputElement>;
	private readonly _passwordRef: RefObject<HTMLInputElement>;

	constructor(props: any) {
		super(props);

		this._emailRef = createRef<HTMLInputElement>();
		this._passwordRef = createRef<HTMLInputElement>();
	}

	submithandler = (event: any) => {
		event.preventDefault();

		const email = this._emailRef.current!.value;
		const password = this._passwordRef.current!.value;

		if (email.trim().length === 0 || password.trim().length === 0) {
			console.log('username/password is empty');
			return;
		}

		const requestBody = {
			query: `
				mutation {
					createUserInput: (userInput: {email: "${email}", password: "${password}"}) {
						_id
						email
					}
				}
			`
		};

		fetch('http:localhost:3001/graphql'),
			{
				method: 'POST',
				body: JSON.stringify(requestBody),
				headers: {
					'Content-Type': 'application / json'
				}
			};
	};

	render() {
		return (
			<form className="auth-form" onSubmit={this.submithandler}>
				<input type="email" ref={this._emailRef} placeholder="youremail@mail.com" autoComplete="on" />
				<input type="password" ref={this._passwordRef} placeholder="******" autoComplete="on" />
				<div className="auth-form__actions">
					<button className="submit" type="submit">
						Submit
					</button>
					<button className="signup" type="button">
						Signup
					</button>
				</div>
			</form>
		);
	}
}

export default AuthPage;
