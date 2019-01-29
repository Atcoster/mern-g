import React, { createRef, RefObject, PureComponent } from 'react';

import AppContext from '../../context/auth-context';

import './Auth.scss';

interface IProps {}

interface IState {
	isLogin: boolean;
}

class AuthPage extends PureComponent<IProps, IState> {
	private readonly _emailRef: RefObject<HTMLInputElement>;
	private readonly _passwordRef: RefObject<HTMLInputElement>;

	static contextType = AppContext;

	constructor(props: any) {
		super(props);

		this._emailRef = createRef<HTMLInputElement>();
		this._passwordRef = createRef<HTMLInputElement>();

		this.state = {
			isLogin: true
		};
	}

	switchModeHandler = () => {
		this.setState(prevState => {
			return { isLogin: !prevState.isLogin };
		});
	};

	submithandler = (event: any) => {
		event.preventDefault();

		const email = this._emailRef.current!.value;
		const password = this._passwordRef.current!.value;

		if (email.trim().length === 0 || password.trim().length === 0) {
			console.log('username/password is empty');
			return;
		}

		let requestBody = {
			query: `
				query {
					login(email: "${email}", password: "${password}") {
						userId
						token
						tokenExpiration
					}
				}
			`
		};

		if (!this.state.isLogin) {
			requestBody = {
				query: `
					mutation {
						createUser(userInput: {email: "${email}", password: "${password}"}) {
							_id
							email
						}
					}
				`
			};
		}

		fetch('http://localhost:3001/graphql', {
			method: 'POST',
			body: JSON.stringify(requestBody),
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then(res => {
				if (res.status !== 200 && res.status !== 201) {
					throw new Error('Failed');
				}

				return res.json();
			})
			.then(resData => {
				if (resData.data.login.token) {
					this.context.login(resData.data.login.token, resData.data.login.userId, resData.data.login.tokenExpiration);
				}
			})
			.catch(err => {
				console.log(err);
			});
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
					<button className="signup" type="button" onClick={this.switchModeHandler}>
						Switch to {this.state.isLogin ? 'Signup' : 'Login'}
					</button>
				</div>
			</form>
		);
	}
}

export default AuthPage;
