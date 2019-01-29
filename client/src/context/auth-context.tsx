import React from 'react';

interface IAppContext {
	token: string | null;
	userId: string | null;
	login: (token: string, userId: string, tokenExpiration: number) => any;
	logout: () => any;
}

const InitialState: IAppContext = {
	token: null,
	userId: null,
	login: (token, userId, tokenExpiration) => {},
	logout: () => {}
};

export default React.createContext<IAppContext | null>(InitialState);
